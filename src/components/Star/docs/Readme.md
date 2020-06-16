<!--
 * @Author: wang_yechao
 * @Date: 2020-02-25 22:49:36
 -->

# 评分

自定义评分

## Attrubutes

| 参数       | 说明                   | 类型    | 可选值 | 默认值 |
| ---------- | ---------------------- | ------- | ------ | ------ |
| total      | 总数                   | Number  | -      | 5      |
| value      | 激活的数量             | Number  | -      | 3      |
| hidden     | 是否显示文本           | Boolean | -      | true   |
| text       | 文本                   | String  | -      | 星     |
| disabled   | 是否只读               | Boolean | -      | false  |
| allowClear | 是否允许再次点击后清除 | Boolean | -      | true   |

## Events

| 事件名称    | 说明                     | 回调参数               |
| ----------- | ------------------------ | ---------------------- |
| hoverChange | 鼠标经过时数值变化的回调 | Function(value:number) |
| change      | 选择时的回调             | Function(value:number) |
