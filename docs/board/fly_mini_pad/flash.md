>[!TIP]
>FLY系统镜像在M2WE和SD卡都有系统情况下默认启动SD卡系统

>[!Warning]
>SD卡注意事项:
>容量必须不小于16GB 或 不大于128G TF 卡
>TF 卡的传输速度必须为 class10 级或 class10 级以上，建议使用闪迪等品牌的 TF 卡

## 烧录前的准备

**需要准备的东西：**

1. SD卡一张

2. 读卡器

3. 系统镜像

4. 工具软件请前往FLY官方群文件夹下载：Fly-Gemini系列； 需要用到的软件有：balenaEtcher（fly群中文件名为系统镜像写入工具）、putty、WinSCP

5. [系统镜像](/introduction/downloadimg.md "点击即可跳转") 

**注：其他非FLY的上位机请勿使用FLY的专属镜像，否则会损坏上位机！！！**

**下载需要用到的工具和文件，国内用户请前往QQ群下载**

* [工具](https://drive.google.com/drive/folders/1llH-lq-WsbIdwkmLL51n3OHo5dNNpcPy)



## 1 准备

1. 先安装好软件**Win32DiskImager**与解压工具
2. SD卡插入读卡器，将读卡器插到电脑USB接口
3. 请确保烧录的sd卡做好备份
4. 系统镜像需要确定是MINI-Pad的系统！！！

## 2. 格式化SD卡

  烧录镜像需要格式化SD卡，请按如下操作：

  1. 点击“**此电脑**” 

  ![格式化1](../../images/boards/fly_pi/format1.png)

  2. 再点击“**磁盘管理**”，找到刚刚插入的内存卡（可移动磁盘），选中后单击右键，点击“**删除卷**”，

  <img src="../../images/boards/fly_pi/format2.png" alt="format2" style="zoom: 80%;" />

  3. 单击右键再单击右键**“新建简单卷**”，新建分区请注意选择文件系统格式为**FAT32**，一直点下一步，直至完成，便将内存卡格式化为只有一个盘。
   
     当然也可以借助第三方工具来格式化内存卡和eMMC。

  ![格式化1](../../images/boards/fly_pi/format3.png)

  <img src="../../images/boards/fly_pi/format4.png" alt="format4" style="zoom:80%;" />

  ![format](../../images/boards/fly_pi/format5.png)

4. 现在可以打开文件资源管理器，多出一个14.5G的U盘（16G eMMC显示大小为14.5G）



## 3. 将下载好的系统镜像解压

> [!TIP] 镜像下载地址：[镜像下载](/introduction/downloadimg "点击即可跳转")

* 将下方系统镜像解压出来
* img.md5这个文件无需解压

![img](../../images/boards/fly_pi/img.png)

## 4. 使用Win32diskimage来烧录系统镜像

* 红色选择需要烧录的文件
* 橙色选择需要烧录的sd卡
* 蓝色将系统烧录到sd卡中
>[!Tip]
>
>请确保烧录的设备是否选择正确

![win32](../../images/boards/fly_pi/win32.png)

* 确认烧录然后等待烧录完成

![win32](../../images/boards/fly_pi/win32_1.png)

* 烧录完成

![win32](../../images/boards/fly_pi/win32_2.png)

* 镜像烧录完成后，请配置 [FLY_Config](/board/fly_pi_lite2/config "点击即可跳转")

>[!Warning]
>
>系统稍微完成后会有一个boot盘与一个win电脑无法识别的分区，请不要格式化！！！
