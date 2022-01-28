# 系统镜像更新日志


## v2

* 2022-1
* 更换发行版本为Bullseye
* 更新内核到5.10.85
* 预装Klipper，Moonraker，Fluidd，Mainsail，KlipperScreen
* 修改boot分区为fat，可直接在windows系统下修改配置文件
* 增加FLY-Config，一个全新的配置系统
* 增加CatSerial，访问```http://ip:9999```可直接查看所有连接的串口设备

### v2.1

* 修复CatSerial没有连接设备出错

### v2.2

* 新增Gemini系列主板BL固件，烧录文档见[BL烧录](/advanced/flashbl.md)

### v2.4

* 修复Klipper缺少部分烧录环境问题
* 修改配置模板
* 新增mJpg支持摄像头
* 新增V1,V1.1主板引脚配置。在FLY_Config切换

## v1

* 与Gemini同时间发布
* 第一版系统镜像，不太成熟。
* 基于Armbian修改
* 预装Klipper，Moonraker，fluidd

