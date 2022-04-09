# 常见问题

> 欢迎各位提交PR

## Klipper常见报错


<!-- tabs:start -->

#### **问**

**Option `'xxxx1'` in section `'xxxx2'` must be specified**

#### **答**

* 这个报错是指在`[xxxx2]`配置节点下没有找到必填的配置项`xxxx1`
* 只需要在`[xxxx2]`节点下加入一行配置，`xxxx1: xx`。
* 具体的值请参照报错的配置项在klipper官方文档搜索

<!-- tabs:end -->

---