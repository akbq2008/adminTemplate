<!--
 * @Author: wang_yechao
 * @Date: 2020-02-27 21:54:28
 -->

# Dialog

弹窗的二次封装

## Attrubutes

| 参数      | 说明                               | 类型    | 可选值 | 默认值                    |
| --------- | ---------------------------------- | ------- | ------ | ------------------------- |
| modal     | 是否可以通过点击 modal 关闭 Dialog | Boolean | -      | false                     |
| showBtn   | 是否显示确定和取消                 | Boolean | -      | true                      |
| style     | dialog 样式                        | Object  | -      | {return {width: '200px;'} |
| title     | dialog 标题                        | String  | -      | 标题                      |
| visible   | dialog 是否显示                    | Boolean | -      | false                     |
| width     | dialog 宽度                        | String  | -      | -                         |
| cancleTxt | 取消按钮文案                       | String  | -      | 取消                      |
| saveTxt   | 确定按钮文案                       | String  | -      | 确定                      |
| order     | 按钮顺序                           | String  | -      | left                      |

## Events

| 事件名称 | 说明        | 回调参数 |
| -------- | ----------- | -------- |
| close    | 关闭 Dialog | -        |
| save     | 保存 Dialog | -        |
