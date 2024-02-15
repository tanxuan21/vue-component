## 简介
(顺序从组件树叶子->组件树根部)
**MenuItem:** 显示每一个单行的菜单条目.
参数:
```javascript
props: {
    itemData: {
        type: Object,
        default: () => {
        return {
            name: "全部节点化",
            icon: "buju",
            event: () => {},
            submenu: null,
        };
        },
    },
    // 位置.
    pos: {
        type: Object,
        default: () => {
        return {
            x: 100,
            y: 100,
        };
        },
    },
},
```

**MenuPage:** 包括MenuItem条目.
参数:
```javascript
props:{
    // 菜单数据
    menuData: {
      type: Array,
      required: true,
    },
    // 菜单层级
    level: {
      default: 1,
      type: Number,
    },
    // 菜单的左上角位置
    pos: {
      type: Object,
      default: function () {
        return {
          x: -1,
          y: -1,
        };
      },
    },
    // 是否显示
    show: {
      type: Boolean,
      default: false,
    },
}
```
    
**MenuArea:** 菜单的区域.内涵模板,允许渲染其他组件.同时,默认的MenuPage的z-index是最大值.

**结构:**
```html
<MenuArea>
    <!-- root-page -->
    <MenuPage class="root-page">
        <MenuItem></MenuItem>
        <MenuItem>
            <!-- sub-page -->
            <MenuPage>
                <MenuItem/>
                ...
            </MenuPage>
        </MenuItem>
        ...
        <MenuItem></MenuItem>
    </MenuPage>
</MenuArea>
```
