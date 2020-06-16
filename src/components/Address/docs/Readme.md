<!--
 * @Author: wang_yechao
 * @Date: 2020-02-25 22:41:03
 -->

# 地址级联组件

省市区三级联动

## Attrubutes

| 参数         | 说明           | 类型    | 可选值 | 默认值               |
| ------------ | -------------- | ------- | ------ | -------------------- |
| selectedData | 当前选中的参数 | Object  | -      | {currentProvince:''} |
| showArea     | 是否展示区域   | Boolean | -      | true                 |
| resetData    | 是否重置数据   | Boolean | -      | false                |
| disabled     | 是否禁止选中   | Boolean | -      | false                |

## Events

| 事件名称        | 说明           | 回调参数 |
| --------------- | -------------- | -------- |
| currentSelected | 当前选中的数据 | data     |
