import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = [{
  code: '1',
  name: '广东省'
}]

const obj = {
  code: '@increment',
  name: '广东省'
}

const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    ...obj
  }))
}
const GategoryTreeDatas = [{
  name: '游戏花费',
  id: '1',
  data: [{
    name: '腾讯QQ专区',
    id: '1-1',
    data: [{
      name: 'QQ币/QQ卡',
      id: '1-1-1',
      group: 'q'
    }, {
      name: 'QQ秀',
      id: '1-1-2',
      group: 'q',
      data: [{
        name: '3DQQ秀',
        id: '1-1-2-1'
      }, {
        name: 'QQ秀场景',
        id: '1-1-2-2',
        group: 'q'
      }, {
        name: 'QQ秀配饰',
        id: '1-1-2-3',
        group: 'q'
      }, {
        name: 'QQ秀美容',
        id: '1-1-2-4',
        group: 'q'
      }, {
        name: 'QQ秀服饰',
        id: '1-1-2-5',
        group: 'q'
      }, {
        name: '其他Q秀',
        id: '1-1-2-6',
        group: 'q'
      }, {
        name: '宠物元宝',
        id: '1-1-2-7',
        group: 'c'
      }, {
        name: '宠物用品',
        id: '1-1-2-8',
        group: 'c'
      }, {
        name: '宠物礼包',
        id: '1-1-2-9',
        group: 'c'
      }, {
        name: '宠物礼包1',
        id: '1-1-2-10',
        group: 'c'
      }, {
        name: '宠物礼包2',
        id: '1-1-2-11',
        group: 'c'
      }, {
        name: '宠物礼包3',
        id: '1-1-2-12',
        group: 'c'
      }, {
        name: '宠物礼包4',
        id: '1-1-2-13',
        group: 'c'
      }, {
        name: '宠物礼包5',
        id: '1-1-2-14',
        group: 'c'
      }]
    }, {
      name: 'QQ宠物',
      id: '1-1-3',
      group: 'q'
    }, {
      name: 'QQ音速',
      id: '1-1-4',
      group: 'q'
    }, {
      name: 'QQ游戏大厅道具',
      id: '1-1-5',
      group: 'q'
    }, {
      name: 'QQ其它',
      id: '1-1-6',
      group: 'q'
    }]
  }, {
    name: '网游装备/游戏币/帐号/代练',
    id: '1-2',
    data: [{
      name: '激活码测试号专区',
      id: '1-2-1',
      group: 'j'
    }, {
      name: '网页游戏物品/资源',
      id: '1-2-2',
      group: 'w'
    }, {
      name: '游戏币',
      id: '1-2-3',
      group: 'y'
    }, {
      name: '游戏装备',
      id: '1-2-4',
      group: 'y'
    }, {
      name: '游戏账号',
      id: '1-2-5',
      group: 'y'
    }, {
      name: '游戏代练',
      id: '1-2-6',
      group: 'y'
    }, {
      name: '游戏装备(新)',
      id: '1-2-66',
      group: 'y'
    }, {
      name: '游戏装备(新1)',
      id: '1-2-7',
      group: 'y'
    }, {
      name: '游戏装备(新2)',
      id: '1-2-8',
      group: 'y'
    }, {
      name: '游戏装备(新3)',
      id: '1-2-9',
      group: 'y'
    }, {
      name: '游戏装备(新4)',
      id: '1-2-10',
      group: 'y'
    }, {
      name: '游戏装备(新5)',
      id: '1-2-11',
      group: 'y'
    }, {
      name: '游戏装备(新6)',
      id: '1-2-12',
      group: 'y'
    }, {
      name: '游戏装备(新7)',
      id: '1-2-13',
      group: 'y'
    }]
  }, {
    name: '网络游戏点卡',
    id: '1-3'
  }]
}, {
  name: '服装鞋包',
  id: '2',
  data: [{
    name: '男装',
    id: '2-1',
    data: [{
      name: '背心马甲',
      id: '2-1-1',
      group: 'b'
    }, {
      name: '衬衫',
      id: '2-1-2',
      group: 'c'
    }, {
      name: '棉裤',
      id: '2-1-22',
      group: 'm'
    }, {
      name: '毛呢大衣',
      id: '2-1-3',
      group: 'm'
    }]
  }, {
    name: '流行男鞋',
    id: '2-2'
  }, {
    name: '女装/女士精品',
    id: '2-3'
  }, {
    name: '女鞋',
    id: '2-4'
  }, {
    name: '箱包皮具/热销女包/男包',
    id: '2-5'
  }, {
    name: '女士内衣/男士内衣/家居服',
    id: '2-6'
  }, {
    name: '服饰配件/皮带/帽子/围巾',
    id: '2-7'
  }]
}, {
  name: '手机数码',
  id: '3',
  data: [{
    name: '电子元器件市场',
    id: '3-1'
  }, {
    name: '手机',
    id: '3-2'
  }, {
    name: '数码相机/单反相机/摄像机',
    id: '3-3'
  }]
}, {
  name: '家用电器',
  id: '4',
  data: [{
    name: '大家电',
    id: '4-1'
  }, {
    name: '影音电器',
    id: '4-2'
  }, {
    name: '生活电器',
    id: '4-3'
  }]
}, {
  name: '美妆饰品',
  id: '5',
  data: [{
    name: '彩妆/香水/美妆工具',
    id: '5-1'
  }, {
    name: '美容护肤/美体/精油',
    id: '5-2'
  }]
}, {
  name: '母婴用品',
  id: '6',
  data: [{
    name: '尿片/洗护/喂哺/推车床',
    id: '6-1'
  }, {
    name: '童装/婴儿装/亲子装',
    id: '6-2'
  }, {
    name: '奶粉/辅食/营养品/零食',
    id: '6-3'
  }]
}, {
  name: '家具建材',
  id: '7',
  data: [{
    name: '家居饰品',
    id: '7-1'
  }, {
    name: '特色手工艺',
    id: '7-2'
  }]
}, {
  name: '百货食品',
  id: '8',
  data: [{
    name: '居家日用',
    id: '8-1'
  }, {
    name: '厨房/烹饪用具',
    id: '8-2'
  }]
}]

export default {
  getProvinces: config => {
    return List
  },
  getCagegorys: config => {
    return GategoryTreeDatas
  }
}
