<style lang="scss" scoped>
	.header {
		font-size: 20px;
    line-height: 60px;
    background: #304156;
    color: #fff;
    i {
    	margin-right: 15px;
    }
	}

	ul {
		list-style: none;
	}
	.list-title {
    font-size: 14px;
    color: #606266;
    font-weight: bold;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	}

	.btn {
		padding: 10px;
	}

	#drawing {
		background: #272822;
		height: 50vh;
	}

	.connect-wrapper {
		margin: 0 0 15px 0;
	}
</style>
<template>
	<el-container>
	  <el-header class="header"><i class="el-icon-edit-outline"></i>系统图配置</el-header>
	  <el-main style="margin-top:30px;">
	  	<el-row style="position:relative;z-index:100">
				<el-col :span="16" :offset="4">
					<el-form  label-width="100px">
					  <el-form-item label="系统图名称">
					    <el-input v-model="title"></el-input>
					  </el-form-item>
					  <el-form-item label="机柜配置">
					  </el-form-item>
					</el-form>
			  	<ul>
			  		<li v-for="(item, index) in config">
			  			<el-form  label-width="80px">
			  				<el-row>
				  				<el-col :span="2" class="list-title">进电柜{{index+1}}:</el-col>
				  				<el-col :span="1"></el-col>
					  			<el-col :span="5">
							      <el-form-item label="电容柜数">
									    <el-input v-model.number="item.capacityNum"></el-input>
									  </el-form-item>
							    </el-col>

							    <el-col :span="5">
							      <el-form-item label="馈电柜数">
									    <el-input v-model.number="item.distributingNum"></el-input>
									  </el-form-item>
							    </el-col>

							    <el-col :span="5">
							      <el-form-item label="回路数">
									    <el-input v-model.number="item.circuitNum"></el-input>
									  </el-form-item>
							    </el-col>
							    <el-col :span="1">&nbsp;</el-col>
							    <el-col :span="3">
							    	<el-button class="btn" type="primary" plain icon="el-icon-plus" circle @click="onAdd(index)"></el-button>
  									<el-button class="btn" type="danger" plain icon="el-icon-delete" circle  @click="onDelete(index)"></el-button>
							    </el-col>
							  </el-row>
							  <el-row v-if="index !== (config.length-1)" class="connect-wrapper">
							  	<el-col :span="1"><el-checkbox v-model="item.connectNext">母联</el-checkbox></el-col>
							  </el-row>
					    </el-form>

			  		</li>
			  	</ul>
				</el-col>
			</el-row>

			<p align="center" style="position:relative;z-index:100">
				<el-button type="primary" icon="el-icon-search"  @click="onPreview">预览</el-button>
				<el-button type="primary" @click="onSubmit" plain>确定</el-button>
				<el-button type="info" plain @click="onClear">重置</el-button>
			</p>

			<el-row>
				<el-col :span="20" :offset="2">
					<div id="drawing"></div>
				</el-col>
			</el-row>

	  </el-main>
	</el-container>
</template>

<script type="text/javascript">

require("svg.js")

let draw;

const padding = 40;
const margin = 60 ; //基础间隔
const w1 = 170; //进电柜宽度
const h1 = 300;
const margin_h1 = 120; //进线柜 左-右 高度差
const w2 = 90; //电容柜宽度
const h2 = 170;
const margin_h2 = 80; // 馈出柜-回路 高度差
const margin_w2 = 70 ; //馈出柜的margin-left
const w3 = 20; //回路宽度
const h3 = 220;

const item_h = 550; //每一个电路图的总高度

//文字相关
let t_color = "#e9af00";
let margin_text = 20; //文字离电路图的top距离

let winParent
let key
//监听父窗口的消息
window.addEventListener("message", function(event) {
	if(event.data && event.data.title == "powerCloudCMS-message") {
		winParent = event.source
		key = event.data.key
	}
}, false)

export default {
	name: 'sysGraph',
	data() {
		return {
			title: "电力系统图",
			config: [
				{
					capacityNum:0,
					distributingNum:0,
					circuitNum:0,
					connectNext:false
				}
			],
			svgRootDom: null,
		}
	},
	methods: {
		init() {
			var total_w_arr = [];
			//黑色背景
			draw = SVG('drawing').size('100%', '100%');
			//标题
			draw.text(this.title||"电力系统图").move(w1+padding,padding).font({ fill: t_color, size: 40 }).addClass('s-t-title');

			this.config.forEach( (o,cabinetIndex) => {

				var G = draw.group().addClass("s-group");

				var base_top = padding + cabinetIndex * item_h;

				//总电压 Ua Ub Uc
				draw.text("Ua:  Ub:  Uc: ").move(w1+padding, margin_h1+item_h*cabinetIndex-20).font({ fill: "#fff", size: 20 }).addClass('s-t-vm')

				//画进线柜
				var cabinet = this.initCabinet();
				cabinet.move(padding, base_top).addClass('s-cab');
				G.add(cabinet);

				//画电容柜
				for(var i = 0; i < o.capacityNum; i++) {
					var ele = this.initCapacity();
					var margin_left = w1 + margin*(i+1) + w2*i;
					console.log(margin_left)
					ele.move(padding+margin_left, base_top+margin_h1).addClass('s-cap');
					G.add(ele);
				}

				//画馈出柜
				var distributing_w = w3*o.circuitNum + margin*(o.circuitNum-1) +15; //15是避免文字溢出的向左偏移量
				for(var i = 0; i < o.distributingNum; i++) {
					var ele = this.InitDistrbuting(o,i);
					var base_margin_left = w1 + (margin+w2)*o.capacityNum;
					ele.move(padding+base_margin_left+margin_w2*(i+1)+distributing_w*i, base_top).addClass('s-distributing');
					G.add(ele);
				}

				// var total_w = w1 + w2*o.capacityNum + (w3*o.circuitNum + margin*(o.circuitNum-1))*o.distributingNum + margin*(1+o.capacityNum+o.distributingNum-1);
				var total_w = w1 + (margin+w2)*o.capacityNum
											+ (margin_w2+distributing_w)*o.distributingNum;
				total_w_arr.push(total_w);

			})

			var max_w = Math.max.apply(null, total_w_arr);

			this.config.forEach( (o,i) => {
				//当前柜最上方横线的的总长度
				var _w;
				// 如果母联到下一级，或者上一级，则宽度要取【最大宽度】
				if(o.connectNext || (i>0 && this.config[i-1].connectNext) ) {
					_w = max_w
				}
				else {
					_w = total_w_arr[i]
				}

				var offset = 40;
				var start = padding+w1-offset;
				draw.line(start, padding+item_h*i+margin_h1, start+_w-w1+offset+offset, padding+item_h*i+margin_h1).stroke({ width: 8, color: '#fff' })

				//画母联的线
				if(o.connectNext) {
					let start_x = padding+w1+max_w-w1+36;
					let start_y = padding+margin_h1+item_h*i;
					let end_x = start_x;
					let end_y = start_y + item_h+4;
					draw.line(start_x,start_y,end_x,end_y).stroke({ width: 8, color: '#fff' })
				}
			})

			this.svgRootDom = document.querySelectorAll("svg")[1];
			this.svgRootDom.setAttribute("viewBox","0,0,"+(padding*2+max_w)+","+(padding*2+item_h*this.config.length));

			//实际在APP里要显示时，要做如下操作
			this.svgRootDom.setAttribute("id","my-svg");

			//实际在APP里要显示时，要做如下操作!!!!
/*
			let window_w = document.documentElement.clientWidth;
			let window_h = document.documentElement.clientHeight;

			let viewBoxVal = this.svgRootDom.getAttribute("viewBox");
			let viewBoxWidth = viewBoxVal.split(",")[2];
		  let viewBoxHeight = viewBoxVal.split(",")[3];

			// 因为之前已经设置了viewbox
			// 所以该SVG图已经根据屏幕大小适配，相当于已经产生过了一次 拉伸/缩小
			let radio_before = (window_w/viewBoxWidth).toFixed(2)


			// 此时再做一个旋转，SVG图的高，要适配当前屏幕的宽，
			// 因此还有一次 拉伸/缩小
			let radio = (window_w/viewBoxHeight).toFixed(2)

		 	//因此最终的拉伸或者缩小，抵消掉第一次的变形
			let radio_final = radio / radio_before

		  this.svgRootDom.style.transform = "rotate(90deg) scale("+radio_final+")"*/

		},
		//进线柜
		initCabinet() {
			var G = draw.group();

			G.circle(50).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(11, 0);
			G.circle(50).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(11, 35);
			//Y字形
			G.polyline([[20, 55],[35, 70],[52,55]]).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' });
			G.line(35, 70, 90, 70).stroke({ width: 2, color: '#fff' });

			G.line(90, 55, 90, 85).stroke({ width: 2, color: '#fff' });
			G.line(95, 60, 95, 80).stroke({ width: 2, color: '#fff' });
			G.line(100, 65, 100, 75).stroke({ width: 2, color: '#fff' });



			G.polyline([[35, 70],[35, h1+margin_h1],[w1,h1+margin_h1],[w1,margin_h1]]).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' });
			G.rect(20, 50).fill("#fff").move(25,180).addClass("s-cab-rect");

			//三个圈
			G.circle(20).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(0, 360);
			G.line(10,350,10,390).stroke({ width: 2, color: '#fff' });
			G.circle(20).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(25, 360);
			G.circle(20).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(50, 360);
			G.line(60,350,60,390).stroke({ width: 2, color: '#fff' });

			//分支
			// G.polyline([[0,0],[30,0],[30,30]]).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move((w1-30), 320);
			// G.text("X").font({ fill: "#fff", size: 14 }).move(w1-5, 342);


			G.text("进线柜").move(w1/2-15,margin_text+h1+margin_h1).font({ fill: t_color, size: 20 });
			//进线柜信息
			G.text(function(add) {
			  add.tspan("Uab:").newLine()
			  add.tspan("Ubc:").newLine()
			  add.tspan("Uac:").newLine()
			  add.tspan("Ia:").newLine()
			  add.tspan("Ib:").newLine()
			  add.tspan("Ic:").newLine()
			  add.tspan("cosφ:").newLine()
			})
			.move(60, item_h/3-40)
			.font({ fill: "#fff", size: 18 })
			.addClass('s-t-cabinet');


			return G;
		},
		//电容柜
		initCapacity() {
			var  G = draw.group();
			//三个圈
			G.circle(20).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(0, 40);
			G.line(10,30,10,70).stroke({ width: 2, color: '#fff' });
			G.circle(20).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(25, 40);
			G.circle(20).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(50, 40);
			G.line(60,30,60,70).stroke({ width: 2, color: '#fff' });

			G.line(35, 0, 35, 190).stroke({ width: 2, color: '#fff' });
			G.rect(20, 50).fill("#fff").move(25,110).addClass("s-cap-rect");
			G.polyline([[34,0], [0,70], [70,70], [34,0]]).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(1, 190);

			//分支
			G.polyline([[0,0], [50,0], [50,100]]).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(35, 85);
			G.rect(10, 40).fill("#272822").stroke({ width: 2, color: '#fff' }).move(80,110);
			G.line(75, 185, 95, 185).stroke({ width: 2, color: '#fff' });
			G.line(77, 190, 93, 190).stroke({ width: 2, color: '#fff' });
			G.line(80, 195, 90, 195).stroke({ width: 2, color: '#fff' });


			G.text("电容柜").move(5,h2+margin_h1).font({ fill: t_color, size: 20 })

			return G;
		},
		//馈出柜
		InitDistrbuting(obj,index) {
			var G = draw.group().addClass('s-distri');
			var offset = 15; //避免文字溢出产生的的偏移量
			//最上面的 竖线 连接线
			G.line(w3/2+offset,margin_h1,w3/2+offset,margin_h1+margin_h2).stroke({ width: 2, color: '#fff' });

			//横线 连接线
			var distributing_w = w3/2+(obj.circuitNum-1)*(w3+margin);
			G.line(offset+w3/2, margin_h1+margin_h2, offset+distributing_w, margin_h1+margin_h2).stroke({ width: 2, color: '#fff' });

			for(var i=0;i<obj.circuitNum;i++) {
				var S_Circuit = this.initCircuit();
				G.use(S_Circuit).move((margin+w3)*i, margin_h1+margin_h2).addClass('s-circuit');
			}

			G.text((index+1)+"#馈出柜").move(distributing_w/2-20,margin_h1+margin_h2/2).font({ fill: t_color, size: 20 });

			return G
		},
		//回路 w=30
		initCircuit() {
			var Symbol = draw.symbol();

			var base_margin_left = 15;

			Symbol.line(base_margin_left+10, 0, base_margin_left+10, margin_h2+h3).stroke({ width: 2, color: '#fff' });
			Symbol.rect(20, 50).fill("#fff").move(base_margin_left,60).addClass("s-rect");
			Symbol.circle(20).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(base_margin_left, 150);
			Symbol.polyline([[0,0], [20,0], [10,30], [0,0]]).stroke({ width: 2, color: '#fff' }).attr({ fill: 'rgba(0,0,0,0)' }).move(base_margin_left, 300);

			//馈出柜 电流信息
			Symbol.text(function(add) {
			  add.tspan("Ia: ").newLine()
			  add.tspan("Ib: ").newLine()
			  add.tspan("Ic: ").newLine()
			})
			.move(0, margin_h2+h3/2)
			// .transform({ x: -10 })
			.font({ fill: "#fff", size: 20 })
			.addClass('s-t-circuit');

			return Symbol;
		},
		onAdd(index) {
			this.config.splice(index+1, 0, {
				capacityNum: 0,
				distributingNum: 0,
				circuitNum: 0,
				connectNext: false
			})
		},
		onDelete(index) {
			if(this.config.length == 1) {
				this.config = [{
					capacityNum: 0,
					distributingNum: 0,
					circuitNum: 0,
					connectNext: false
				}]
			}
			else {
				this.config.splice(index, 1)
			}

		},
		onSubmit() {
			var str = document.querySelector("#drawing").innerHTML
		  if (winParent && str.length) {
		    winParent.postMessage({title:"powerCloudCMS-message", key:key, svg:str}, '*')
		    window.close()
		  }
		},
		onPreview() {
			document.querySelector("#drawing").innerHTML = ""
			console.log(this.config)
			this.init();
		},
		onClear() {
			document.querySelector("#drawing").innerHTML = ""
			this.title = ""
			this.config = [{
				capacityNum: 0,
				distributingNum: 0,
				circuitNum: 0
			}]
		}
	}
}
</script>
