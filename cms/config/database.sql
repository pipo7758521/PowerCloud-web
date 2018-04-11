-- MySQL dump 10.13  Distrib 5.7.21, for Win64 (x86_64)
--
-- Host: 202.118.26.77    Database: power_cloud
-- ------------------------------------------------------
-- Server version	5.5.56-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `biz_codetask`
--

DROP TABLE IF EXISTS `biz_codetask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_codetask` (
  `id` int(11) NOT NULL,
  `codeID` int(5) DEFAULT NULL,
  `codeName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_customer`
--

DROP TABLE IF EXISTS `biz_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shortName` varchar(100) NOT NULL,
  `company` varchar(100) DEFAULT NULL COMMENT '公司名称，系统内部唯一',
  `companyCode` varchar(20) NOT NULL COMMENT '公司组织机构代码',
  `address` varchar(100) DEFAULT NULL COMMENT '公司地址',
  `location` varchar(50) DEFAULT NULL COMMENT '地图位置，X经度，Y维度{“lng”:"102.23", "lat":"223.11"}',
  `bizOwnerName` varchar(10) DEFAULT NULL COMMENT '业务负责人姓名',
  `bizOwnerTel` varchar(20) NOT NULL COMMENT '业务负责人办公电话',
  `bizOwnerPhone` varchar(11) NOT NULL COMMENT '业务负责人移动电话',
  `taxpayerIdentification` varchar(20) NOT NULL COMMENT '开票信息',
  `bank` varchar(40) NOT NULL COMMENT '开户行',
  `bankAccount` varchar(40) NOT NULL COMMENT '银行账户',
  `financeChiefName` varchar(10) DEFAULT NULL COMMENT '财务负责人姓名',
  `financeChiefTel` varchar(20) NOT NULL COMMENT '财务负责人办公电话',
  `financeChiefPhone` varchar(11) NOT NULL COMMENT '财务负责人移动电话',
  `companyTypeCode` varchar(10) NOT NULL COMMENT '企业类型代码（01：工业，02：商业，03：农业）',
  `dataAuthorityID` int(11) DEFAULT NULL COMMENT '数据权限ID，将权限控制到用户级别',
  `isSpecialPower` tinyint(4) NOT NULL COMMENT '是否特殊用电企业',
  `superiorUnitCode` int(11) NOT NULL COMMENT '上级单位代码，如果为空，则为独立单位',
  `endTime` datetime DEFAULT NULL COMMENT '用户有效期，判断用户',
  `pic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='客户表，记录客户信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_data`
--

DROP TABLE IF EXISTS `biz_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gatewayID` int(11) DEFAULT NULL COMMENT '网关ID',
  `jsonData` varchar(1000) DEFAULT NULL COMMENT '将类保存为json格式',
  `dataTIme` datetime DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_data_deviceelecmeter`
--

DROP TABLE IF EXISTS `biz_data_deviceelecmeter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_data_deviceelecmeter` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `gatewayID` int(11) DEFAULT NULL COMMENT '网关ID',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `voltageA` varchar(10) DEFAULT NULL COMMENT 'A电压',
  `voltageB` varchar(10) DEFAULT NULL COMMENT 'B电压',
  `voltageC` varchar(10) DEFAULT NULL COMMENT 'C电压',
  `currentA` varchar(10) DEFAULT NULL COMMENT 'A电流',
  `currentB` varchar(10) DEFAULT NULL COMMENT 'B电流',
  `currentC` varchar(10) DEFAULT NULL COMMENT 'C电流',
  `type` varchar(10) DEFAULT NULL COMMENT '类型（总回路|分回路）',
  `dataTime` datetime DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34924 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_detailtype_device`
--

DROP TABLE IF EXISTS `biz_detailtype_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_detailtype_device` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '相同类型的设备，使用相同的解析方法，bizType，代码表',
  `num` int(11) DEFAULT NULL COMMENT '编号',
  `expression` varchar(20) DEFAULT NULL COMMENT '含义',
  `registerNum` int(11) DEFAULT NULL COMMENT '寄存器数量',
  `unit` varchar(10) DEFAULT NULL COMMENT '单位',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='设备类型表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_device_elecmeter`
--

DROP TABLE IF EXISTS `biz_device_elecmeter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_device_elecmeter` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cabinetID` int(11) DEFAULT NULL COMMENT '电表所在柜ID',
  `cabinettype` int(4) DEFAULT NULL COMMENT '柜类型0:进线柜 1:电容 2:馈电',
  `manufacturer` varchar(45) DEFAULT NULL COMMENT '生产企业',
  `manufacturerCode` varchar(45) DEFAULT NULL COMMENT '生产编号',
  `manufacturDate` date DEFAULT NULL COMMENT '生产日期',
  `gatewayCode` int(11) DEFAULT NULL COMMENT '网关内部需要，业务编号，数据传输使用',
  `typeDeviceID` int(11) DEFAULT NULL COMMENT '设备解析类型，用来对应该变压器的信息解析',
  `num` int(10) DEFAULT NULL COMMENT '回路编号',
  `circuitName` varchar(45) DEFAULT NULL COMMENT '回路名称，电表的总电量',
  `circuitType` varchar(5) DEFAULT NULL COMMENT '回路类型（总表|其它）',
  `gatewayID` int(11) DEFAULT NULL COMMENT '网关ID号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='电表表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_device_exception`
--

DROP TABLE IF EXISTS `biz_device_exception`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_device_exception` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '每个企业设置自己的报警阈值',
  `deviceID` int(11) DEFAULT NULL COMMENT '设备ID',
  `num` int(11) DEFAULT NULL COMMENT '序号',
  `condation` varchar(10) DEFAULT NULL COMMENT '大于、小于、区间、等于',
  `value1` varchar(10) DEFAULT NULL COMMENT '取值1',
  `value2` varchar(10) DEFAULT NULL COMMENT '取值2',
  `exceptionCode` varchar(10) DEFAULT NULL COMMENT '异常代码biz_coeException',
  `desc` varchar(45) DEFAULT NULL COMMENT '异常说明',
  `status` varchar(10) DEFAULT NULL COMMENT '0 启用；1 停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='设备类型异常表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_device_gateway`
--

DROP TABLE IF EXISTS `biz_device_gateway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_device_gateway` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gatewayName` varchar(45) DEFAULT NULL COMMENT '网关名称',
  `manufacturer` varchar(45) DEFAULT NULL COMMENT '网关企业',
  `mac` varchar(45) DEFAULT NULL COMMENT 'MAC地址',
  `subjectID` varchar(45) DEFAULT NULL COMMENT '订阅主题ID',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '安装的变电所ID',
  `gatewayUSR` varchar(11) DEFAULT NULL COMMENT '网关用户名',
  `gatewayPSW` varchar(11) DEFAULT NULL COMMENT '网关密码',
  `desc` varchar(45) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='网关表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_device_highcabinet`
--

DROP TABLE IF EXISTS `biz_device_highcabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_device_highcabinet` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '高压柜ID',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `lowcabinetType` varchar(10) DEFAULT NULL COMMENT '进线柜、计量柜、受电柜、PT柜、所用变压器柜、馈出柜、联络柜、其他biz_code_highcabinet_model',
  `manufacturer` varchar(45) DEFAULT NULL,
  `highCabinetModel` varchar(20) DEFAULT NULL,
  `manufacturDate` date DEFAULT NULL,
  `specifications` varchar(20) DEFAULT NULL,
  `pic` varchar(100) DEFAULT NULL,
  `diagram` varchar(1000) DEFAULT NULL,
  `voltageClass` varchar(10) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='高压柜';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_device_lowcabinet`
--

DROP TABLE IF EXISTS `biz_device_lowcabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_device_lowcabinet` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '低压柜ID',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `num` int(5) DEFAULT NULL COMMENT '所内编号',
  `lowCabinetType` varchar(10) DEFAULT NULL COMMENT '进线柜、电容器柜、馈线柜、联络柜\nbiz_code_lowcabinet_type\n',
  `manufacturer` varchar(45) DEFAULT NULL COMMENT '生产企业',
  `lowCabinetModel` varchar(10) DEFAULT NULL COMMENT '型号：GGD，GCK, GCS, MNS, PZ30\nbiz_code_lowcabinet_model',
  `manufacturDate` date DEFAULT NULL COMMENT '生产日期',
  `specifications` varchar(20) DEFAULT NULL COMMENT '规格 长*宽*高',
  `pic` varchar(100) DEFAULT NULL COMMENT '照片，多张中间以“；”进行分割',
  `inCableModel` varchar(20) DEFAULT NULL COMMENT '进线电缆型号',
  `outCableModel` varchar(20) DEFAULT NULL COMMENT '馈出电缆型号',
  `mainBusModel` varchar(20) DEFAULT NULL COMMENT '主母排型号',
  `NLineModel` varchar(20) DEFAULT NULL COMMENT 'N线型号',
  `PELineModel` varchar(20) DEFAULT NULL COMMENT 'PE线型号',
  `status` varchar(10) DEFAULT NULL COMMENT '状态（系统用）0 正常，1 停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='低压柜表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_device_transformer`
--

DROP TABLE IF EXISTS `biz_device_transformer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_device_transformer` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '变压器ID',
  `connectionType` int(5) DEFAULT NULL COMMENT '连接类型，（母连|独体)',
  `manufacturer` varchar(45) DEFAULT NULL COMMENT '生产企业',
  `manufacturerCode` varchar(45) DEFAULT NULL COMMENT '生产编号',
  `transformerModel` varchar(20) DEFAULT NULL COMMENT '型号',
  `weight` int(11) DEFAULT NULL COMMENT '重量（千克）',
  `workEnviorment` varchar(10) DEFAULT NULL COMMENT '使用条件（户内式，户外式）',
  `workType` varchar(10) DEFAULT NULL COMMENT '种类（干式，油浸）',
  `ratedVoltage` varchar(10) DEFAULT NULL COMMENT '额定电压',
  `ratedFrequency` varchar(10) DEFAULT NULL COMMENT '额定频率',
  `connectionGroupLabel` varchar(10) DEFAULT NULL COMMENT '联结组标号 Dyn11 和 Yyn0',
  `InsulationClass` varchar(10) DEFAULT NULL COMMENT '绝缘耐热等级（A、E、B、F、H、C、N、R级）',
  `manufacturDate` date DEFAULT NULL COMMENT '生产日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='变压器箱';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_devicecapacitorcabinet`
--

DROP TABLE IF EXISTS `biz_devicecapacitorcabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_devicecapacitorcabinet` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `num` int(5) DEFAULT NULL COMMENT '所内编号',
  `manufacturer` varchar(40) DEFAULT NULL COMMENT '生产企业',
  `status` varchar(10) DEFAULT NULL COMMENT '状态（系统用）0正常，1停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_devicegateway_instructions`
--

DROP TABLE IF EXISTS `biz_devicegateway_instructions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_devicegateway_instructions` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `gatewayID` int(11) DEFAULT NULL COMMENT '网关ID',
  `num` varchar(5) DEFAULT NULL COMMENT '指令编号Data+i',
  `deviceID` int(11) DEFAULT NULL COMMENT '设备ID',
  `typeDeviceName` varchar(40) DEFAULT NULL COMMENT '设备类型（电表）ElecMeter01，ElecMeter01',
  `instruction` varchar(40) DEFAULT NULL COMMENT '指令',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_deviceincomingcabinet`
--

DROP TABLE IF EXISTS `biz_deviceincomingcabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_deviceincomingcabinet` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `num` int(5) DEFAULT NULL COMMENT '所内编号',
  `manufacturer` varchar(40) DEFAULT NULL COMMENT '生产企业',
  `transformerID` int(11) DEFAULT NULL COMMENT '变压器ID',
  `status` varchar(10) DEFAULT NULL COMMENT '状态（系统用）0正常，1停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_devicelowcabinet_pic`
--

DROP TABLE IF EXISTS `biz_devicelowcabinet_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_devicelowcabinet_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `lowCabinetID` int(11) DEFAULT NULL COMMENT '馈电柜ID',
  `num` int(5) DEFAULT NULL COMMENT '图纸编号',
  `pic` varchar(100) DEFAULT NULL COMMENT '图纸图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_devicetransformer_connection`
--

DROP TABLE IF EXISTS `biz_devicetransformer_connection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_devicetransformer_connection` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `transformerID_A` int(11) DEFAULT NULL COMMENT '变压器1ID',
  `transformerID_B` int(11) DEFAULT NULL COMMENT '变压器2ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_electrician`
--

DROP TABLE IF EXISTS `biz_electrician`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_electrician` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '电工ID，系统内唯一',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `identityCard` varchar(18) DEFAULT NULL COMMENT '身份证号码',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `companyID` int(11) DEFAULT NULL COMMENT '所属机构代码，对应企业表中企业ID',
  `address` varchar(50) DEFAULT NULL COMMENT '住址',
  `Tel` varchar(20) DEFAULT NULL COMMENT '办公电话',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号码',
  `positionalTitle` varchar(10) DEFAULT NULL COMMENT '职称',
  `pic` varchar(45) DEFAULT NULL COMMENT '照片',
  `ecNum` varchar(30) DEFAULT NULL COMMENT '电工证编号（电工证 Electrician Certificate）',
  `ecType` varchar(40) DEFAULT NULL COMMENT '作业类别（电工证）（代码表biz_electricianCertificateWorkType）',
  `ecGrantTime` date DEFAULT NULL COMMENT '授予时间（电工证）',
  `ecLicenseNum` varchar(45) DEFAULT NULL COMMENT '许可证编号（电工证）',
  `ecPic` varchar(45) DEFAULT NULL COMMENT '证件照片（电工证）',
  `scNum` varchar(45) DEFAULT NULL COMMENT '安全证证件编号（安全证Safe Certificate）',
  `scCompanyName` varchar(100) DEFAULT NULL COMMENT '企业名称（安全证）',
  `scDuty` varchar(45) DEFAULT NULL COMMENT '职务（安全证）主要负责人',
  `scTechnicalTitle` varchar(45) DEFAULT NULL COMMENT '技术职称（安全证）工程师',
  `scIssueDate` date DEFAULT NULL COMMENT '发证日期（安全证）',
  `scDateStart` date DEFAULT NULL COMMENT '有效期起（安全证）',
  `scDateEnd` date DEFAULT NULL COMMENT '有效期止（安全证）',
  `scPic` varchar(45) DEFAULT NULL COMMENT '证件照片（安全证）',
  `status` varchar(10) DEFAULT NULL COMMENT '状态（系统用）',
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='电工表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_electrician_pic`
--

DROP TABLE IF EXISTS `biz_electrician_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_electrician_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `electricianID` int(11) NOT NULL COMMENT '电工ID，系统内唯一',
  `type` varchar(10) DEFAULT NULL COMMENT '证件类型：电工证 |安全证',
  `num` int(5) NOT NULL COMMENT '系统内证件编号',
  `pic` varchar(100) DEFAULT NULL COMMENT '证件照片（安全证）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_electrician_position`
--

DROP TABLE IF EXISTS `biz_electrician_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_electrician_position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `electricianID` int(11) DEFAULT NULL COMMENT '电工ID',
  `lacation` varchar(50) DEFAULT NULL COMMENT '地图位置，X经度，Y纬度 {“lng”: “103.12”, “lat”: “223.11”}',
  `dataTime` datetime DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='电工位置';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_electricity_substation`
--

DROP TABLE IF EXISTS `biz_electricity_substation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_electricity_substation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '变电所ID',
  `subStationName` varchar(30) DEFAULT NULL COMMENT '变电所名称',
  `companyID` int(11) DEFAULT NULL COMMENT '所属企业ID',
  `address` varchar(45) DEFAULT NULL COMMENT '变电所地址',
  `type` varchar(10) DEFAULT NULL COMMENT '变电所类型（箱变|变电所）',
  `lacation` varchar(50) DEFAULT NULL COMMENT '地图位置，X经度，Y纬度｛“lng”：''102.23''，"lat":''223,11''｝',
  `powerType` varchar(10) DEFAULT NULL COMMENT '电压状态 0 单电源，1 双电源。代码表 biz_codePowerType',
  `voltageClass` varchar(10) DEFAULT NULL COMMENT '电压等级 0 220v， 1 380 v， 2 10KV。biz_code_voltageclass',
  `diagram` text COMMENT '图 SVG，多张中间以“；”进行分割，一次系统图',
  `total` int(11) DEFAULT NULL COMMENT '总容量',
  `ConstructionUnit` varchar(45) DEFAULT NULL COMMENT '承建单位',
  `ConstructionTime` date DEFAULT NULL COMMENT '建设时间',
  `inVoltage` varchar(15) DEFAULT NULL COMMENT '入所侧电压',
  `outVoltage` varchar(15) DEFAULT NULL COMMENT '出所侧电压',
  `pic` varchar(100) DEFAULT NULL COMMENT '图纸，多张中间以“；”进行分割',
  `status` varchar(10) DEFAULT NULL COMMENT '状态（系统用）0 正常，1 停用，2 维修中',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='变电所表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_electricitysubstation_pic`
--

DROP TABLE IF EXISTS `biz_electricitysubstation_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_electricitysubstation_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `num` int(11) DEFAULT NULL COMMENT '图纸编号',
  `pic` varchar(100) DEFAULT NULL COMMENT '图纸图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_electricitysubstation_video`
--

DROP TABLE IF EXISTS `biz_electricitysubstation_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_electricitysubstation_video` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `num` int(5) DEFAULT NULL COMMENT '视频编号',
  `manufacturer` varchar(40) DEFAULT NULL COMMENT '生产企业',
  `URL` varchar(100) DEFAULT NULL COMMENT '视频URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_exception`
--

DROP TABLE IF EXISTS `biz_exception`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_exception` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exceptionCode` varchar(10) DEFAULT NULL COMMENT '异常代码',
  `desc` varchar(45) DEFAULT NULL COMMENT '异常说明',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `dateTime` datetime DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='异常表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_magdomain`
--

DROP TABLE IF EXISTS `biz_magdomain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_magdomain` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理域ID，系统内唯一',
  `magDomain` varchar(20) DEFAULT NULL COMMENT '管理域名称',
  `createrID` int(11) DEFAULT NULL COMMENT '创建人',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `status` varchar(10) DEFAULT NULL COMMENT '状态（系统用），0正常，1停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理域表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_magdomain_customer`
--

DROP TABLE IF EXISTS `biz_magdomain_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_magdomain_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `magdomainID` int(11) DEFAULT NULL COMMENT '管理域ID',
  `companyID` int(11) DEFAULT NULL COMMENT '电工ID',
  `post` varchar(10) DEFAULT NULL COMMENT '岗位代码，1 经理，2组长，3组员',
  `status` varchar(10) DEFAULT NULL COMMENT '状态（系统用），0 正常，1 停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='管理域_客户关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_magdomain_electrician`
--

DROP TABLE IF EXISTS `biz_magdomain_electrician`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_magdomain_electrician` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `magDomainID` int(11) DEFAULT NULL,
  `electricianID` int(11) DEFAULT NULL,
  `post` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_magdomain_electricitysubstation`
--

DROP TABLE IF EXISTS `biz_magdomain_electricitysubstation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_magdomain_electricitysubstation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `magDomainID` int(11) DEFAULT NULL COMMENT '管理域ID',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `status` varchar(10) DEFAULT NULL COMMENT '状态（系统用）0正常，1停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_service`
--

DROP TABLE IF EXISTS `biz_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_service` (
  `id` int(11) NOT NULL COMMENT '主键',
  `companyID` int(11) DEFAULT NULL COMMENT '企业ID',
  `serviceName` varchar(20) DEFAULT NULL COMMENT '服务报告名称',
  `reportPath` varchar(40) DEFAULT NULL COMMENT '服务报告路径(?pdf是否直接保存数据库)',
  `time` datetime DEFAULT NULL COMMENT '服务时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_type_device`
--

DROP TABLE IF EXISTS `biz_type_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_type_device` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '相同类型的设备，使用相同的解析方法，bizType，代码表',
  `typeDeviceName` varchar(20) DEFAULT NULL COMMENT '设备类型名称',
  `functionName` varchar(100) DEFAULT NULL COMMENT '解析函数名称',
  `className` varchar(100) DEFAULT NULL COMMENT '解析类名称',
  `description` varchar(45) DEFAULT NULL COMMENT '备注说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='设备类型表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_video`
--

DROP TABLE IF EXISTS `biz_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_video` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所ID',
  `num` int(5) DEFAULT NULL COMMENT '编号',
  `videoURL` varchar(100) DEFAULT NULL COMMENT '连接URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_worktask`
--

DROP TABLE IF EXISTS `biz_worktask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_worktask` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `exceptionCode` varchar(10) DEFAULT NULL COMMENT '异常代码由那个异常产生的工单',
  `description` varchar(45) DEFAULT NULL COMMENT '异常说明',
  `status` varchar(10) DEFAULT NULL COMMENT '工单状态：1 待接收、2 处理中',
  `reason` varchar(200) DEFAULT NULL COMMENT '事故原因',
  `pic` varchar(1000) DEFAULT NULL COMMENT '图片',
  `electricianID` int(11) DEFAULT NULL COMMENT '当前处理电工',
  `companyID` int(11) DEFAULT NULL COMMENT '企业',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所',
  `startTime` datetime DEFAULT NULL COMMENT '工单生成时间',
  `acceptTime` datetime DEFAULT NULL COMMENT '工单接收时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='工单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_worktask_finish`
--

DROP TABLE IF EXISTS `biz_worktask_finish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_worktask_finish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exceptionCode` varchar(10) DEFAULT NULL COMMENT '异常代码，由哪个异常产生的工单',
  `description` varchar(45) DEFAULT NULL COMMENT '异常说明',
  `reason` varchar(200) DEFAULT NULL COMMENT '事故原因',
  `action` varchar(200) DEFAULT NULL COMMENT '处理办法',
  `pic` varchar(100) DEFAULT NULL COMMENT '图片',
  `electricianID` int(11) DEFAULT NULL COMMENT '当前处理电工',
  `companyID` int(11) DEFAULT NULL COMMENT '企业',
  `electricitySubstationID` int(11) DEFAULT NULL COMMENT '变电所',
  `commenter` int(11) DEFAULT NULL COMMENT '评价人ID',
  `score` varchar(10) DEFAULT NULL COMMENT '评分',
  `comment` varchar(10) DEFAULT NULL COMMENT '评价',
  `startTime` datetime DEFAULT NULL,
  `acceptTime` datetime DEFAULT NULL,
  `finishedTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='工单完成表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `biz_worktaskback`
--

DROP TABLE IF EXISTS `biz_worktaskback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_worktaskback` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `description` varchar(100) DEFAULT NULL COMMENT '退回原因',
  `electricianID` int(11) DEFAULT NULL COMMENT '当前处理电工',
  `backtime` datetime DEFAULT NULL COMMENT '退回时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sys_data_authority`
--

DROP TABLE IF EXISTS `sys_data_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_data_authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataAuthorityValue` varchar(100) NOT NULL COMMENT '系统内部唯一，需要校验',
  `status` varchar(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='数据权限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sys_function`
--

DROP TABLE IF EXISTS `sys_function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_function` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '功能ID，系统唯一标识',
  `functionName` varchar(45) NOT NULL COMMENT '功能名称，系统唯一',
  `functionURL` varchar(255) NOT NULL COMMENT '功能URL，指定URL的位置',
  `status` varchar(10) NOT NULL COMMENT '状态\n',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='系统功能表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '系统内部角色DI唯一',
  `roleName` varchar(45) NOT NULL COMMENT '角色名称：（命名规则，角色由超级管理员设置）',
  `status` varchar(10) NOT NULL COMMENT '用户状态，0正常、1注销、2暂停',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='系统角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sys_role_function`
--

DROP TABLE IF EXISTS `sys_role_function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_role_function` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleID` int(11) NOT NULL,
  `functionID` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色功能表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户DI，系统唯一标识',
  `userName` varchar(45) NOT NULL COMMENT '用户名，系统唯一',
  `password` varchar(45) NOT NULL COMMENT '用户密码，加密',
  `customerID` int(11) NOT NULL COMMENT '所属用户代码',
  `tel` varchar(20) DEFAULT NULL COMMENT '电话号码',
  `status` varchar(10) NOT NULL DEFAULT '1' COMMENT '用户状态，0正常，1注销，2暂停',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100000035 DEFAULT CHARSET=utf8 COMMENT='系统用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sys_user_data_auth`
--

DROP TABLE IF EXISTS `sys_user_data_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_user_data_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户数据权限关联表',
  `userID` int(11) NOT NULL,
  `dataID` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sys_user_role`
--

DROP TABLE IF EXISTS `sys_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `roleID` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='用户角色表';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-11 16:33:07
