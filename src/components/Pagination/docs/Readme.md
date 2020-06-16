<!--
 * @Author: wang_yechao
 * @Date: 2020-02-29 13:16:12
 -->

# 分页组件

分页组件的二次封装（element-admin）

## Attrubutes

| 参数       | 说明                         | 类型    | 可选值                                            | 默认值                                  |
| ---------- | ---------------------------- | ------- | ------------------------------------------------- | --------------------------------------- |
| total      | 总数量                       | Number  | -                                                 | 0                                       |
| page       | 当前页                       | Number  | -                                                 | 1                                       |
| limit      | 每页显示条目个数             | Number  | -                                                 | 20                                      |
| pageSizes  | 每页显示个数选择器的选项设置 | Array   | -                                                 | [10, 20, 30, 50]                        |
| layout     | 组件布局，子组件名用逗号分隔 | String  | sizes, prev, pager, next, jumper, ->, total, slot | total, sizes, prev, pager, next, jumper |
| background | 是否为分页按钮添加背景色     | Boolean | -                                                 | false                                   |
| autoScroll | 当前页是否自动滚动           | Boolean | -                                                 | true                                    |
| hidden     | 每页显示条目个数             | Boolean | -                                                 | false                                   |

## Events

| 事件名称   | 说明         | 回调参数                               |
| ---------- | ------------ | -------------------------------------- |
| pagination | 当前分页数据 | { page: this.currentPage, limit: val } |
