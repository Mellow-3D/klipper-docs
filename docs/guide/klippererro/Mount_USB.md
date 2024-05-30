FLY上位机挂载U盘方法

>[!Warning]
>
>目前FLY上位机只有mini pad  Lite和lite2才需要执行此步骤,其他FLY上位机无需执行

使用SSH软件连接到上位机后执行下方指令

请注意此命令会让上位机重启！!！

请注意此命令会让上位机重启！！！

请注意此命令会让上位机重启！！！

```
sudo rm -rf /etc/udev/rules.d/fly_devices.rules && sudo wget https://upyun.pan.zxkxz.cn/Utils/fly_devices.rules -O /etc/udev/rules.d/fly_devices.rules > /dev/null 2>&1 && sudo chmod +x /etc/udev/rules.d/fly_devices.rules && sudo service udev restart && sudo reboot
```

