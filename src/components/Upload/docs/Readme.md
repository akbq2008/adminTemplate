<!--
 * @Author: wang_yechao
 * @Date: 2020-02-25 22:41:03
 -->

# 图片上传组件

基于 el-upload 的上传组件的二次封装

## Attrubutes

| 参数     | 说明                 | 类型    | 可选值 | 默认值                                    |
| -------- | -------------------- | ------- | ------ | ----------------------------------------- |
| data     | 数据                 | Array   | -      | []                                        |
| fileSize | 文件大小限制         | Number  | -      | 2M                                        |
| limit    | 文件数量限制         | Number  | -      | 1 个                                      |
| hidden   | 是否隐藏文件上传信息 | Boolean | -      | true                                      |
| imgStyle | 图片样式             | Object  | -      | {return {width: '200px',height:'200px'}}  |
| info     | 文案提示信息         | String  | -      | 建议上传尺寸 500\*500,jpg 或 png 格式图片 |
| content  | 替换文案             | String  | -      | 确认要替换图片吗？                        |

## Events

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| success  | 图片上传成功的回调 | url      |
| close    | 图片删除的回调     | -        |
