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
            name: "",
            icon: "",
            event: () => {},
            submenu: null,
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

## 显示隐藏
#### 右键显示隐藏
MenuPage注册的contextmenu事件和click控制显示隐藏.
MenuArea props:show > MenuPage class:`show`控制`根菜单页`隐藏显示

#### 子菜单显示隐藏
通过css选择器实现.
```css
.menu-item-container:hover > :last-child {
    display: block;
}
```
## 菜单位置
**root-page菜单位置:**
计算属性stylePos.依赖参数pos
**子菜单位置:**
由于我设计的嵌套结构,直接根据level设置translate即可.设计计算属性:
```javascript
const stylePos = computed(() => {
      if (props.level === 1) {
        return {
          translate: `0 0`,
          top: props.pos.y + "px",
          left: props.pos.x + "px",
        };
      }
      return {
        // translate:`170px -23px`,
      };
    });
```
这里的translate不要硬编码.因为它是一个变量.下一小节叙述它.

## MenuArea边缘显示

如果鼠标在右侧-下侧边缘,那么菜单就会显示出container,需要将菜单移回来.
rePosition思路:
1. 对于每个page,初始获取自身的BoundingRect,拿到宽高pageGeo.
> 宽高是动态的(至少样式是按心情随时会更改),我不想改了less还要回来改js.
2. 根据1的pageGeo和ContainerGeo设计计算属性`limit`,即是每个page的边界.作为是否需要重新设置translate的判定.
3. 鼠标点击(移入MenuItem组件),修改参数pos值.
> pos的含义是page的起点值(左上角),但是根菜单和子菜单的处理方式是不一样的.根菜单设置top-left值,子菜单设置translate值.
4. stylePos根据pos和limit计算新的translate.希望:
   1. 每个page都尽可能贴边显示.
   2. 横向超出了就将子菜单放到父菜单左边.
   3. 纵向超出了就将子菜单的底边缘贴紧容器的底边缘.

**实现的细节和困难**
1. 由于递归构造的菜单page,并且所有的菜单page的默认样式都是`display:none;`,因此在onMounted内无法通过设置display:block得到BoundingRect再设置回display:none的方法得到BoundingRect.(递归从底层开始挂载.父page的display是none,子page都是none,也得不到BoundingRect.)
不能将默认样式改为display:block;因为子菜单的显示隐藏是用伪类实现,只能设置block而不能设置none.(不放弃伪类的原因是伪类效率比mouseenter高)
创建一个新的临时类样式.将其初始display设置为block.拿到pageGeo之后就永远的将其禁用掉即可.
2. 

