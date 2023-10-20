FLY挂载U盘方法

使用SSH软件连接到上位机后执行下方指令

请注意此命令会让上位机重启！!！

请注意此命令会让上位机重启！！！

请注意此命令会让上位机重启！！！

```
sudo rm -rf /etc/udev/rules.d/fly_devices.rules && sudo wget https://upyun.pan.zxkxz.cn/Utils/fly_devices.rules -O /etc/udev/rules.d/fly_devices.rules > /dev/null 2>&1 && sudo chmod +x /etc/udev/rules.d/fly_devices.rules && sudo service udev restart && sudo reboot
```

