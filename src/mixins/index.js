export default {
  data () {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      total: 0, // 总页数
      search: '', // 搜索关键字
      currentVal: '', // 当前select选中
      selected: [], // 选中的
      time: [],
      startTime: '',
      endTime: '',
      dialogTitle: '标题'
    }
  },
  methods: {
    /**
      *
      * @param {*} title  dialog标题
      */
    oepnDialog (title) {
      this.dialogFormVisible = true
      this.dialogTitle = title
    },
    /**
     * 关闭dialog
     */
    closeDialog () {
      this.dialogFormVisible = false
    },
    handleSearch () {
      if (this.time && this.time.length > 0) {
        this.startTime = this.time[0].getTime() / 1000
        this.endTime = this.time[1].getTime() / 1000
      }
      this.page = 1
      this.getListData()
    },
    handleSelectionChange (val, key) {
      this.selected = []
      val.forEach(item => {
        this.selected.push(+item[key] ? +item[key] : +item.id)
      })
    },
    handleOperation (key, fun, title, callback) {
      if (this.selected.length === 0) {
        this.$message({
          message: '请先选择',
          type: 'warning'
        })
        return
      }
      if (this.selected.length !== 0) {
        this.$confirm(title || '确认要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'

        }).then(() => {
          try {
            const formData = {
              [key]: this.selected
            }
            fun(formData).then(res => {
              if (callback) {
                callback()
              } else {
                const data = res.data
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '操作成功!'
                  })
                  this.page = 1
                  this.getListData()
                  this.selected = []
                } else {
                  this.$message({
                    type: 'error',
                    message: data.message
                  })
                }
              }
            })
          } catch (error) {
            console.log(error)
          }
        })
      }
    }
  }
}
