const menu = [{
    name: "item1",
    icon: "buju",
    event: function () {},
    submenu: [{
        name: "item1-1",
        icon: "",
        event: () => {
            console.log('item1-1');
        },
        submenu: null,
    }, {
        name: "item1-2",
        icon: "qita",
        event: () => {
            console.log('item1-2');
        },
        submenu: null,
    }, {
        name: "item1-3",
        icon: "siweidaotu1",
        event: function () {
            console.log('item1-3');
        },
        submenu: null,
    }, ]
}, {
    name: "item2",
    icon: "siweidaotu1",
    event: function () {
        console.log('item2');
    },
    submenu: null,
}, {
    name: "item3",
    icon: "wenjianjia",
    event: function () {
        console.log('item3');
    },
    submenu: null
}, {
    name: "item4",
    icon: "shezhi",
    event: function () {
        console.log('item4');
    },
    submenu: [{
        name: "item4-1",
        icon: "",
        event: function () {
            console.log('item4-1');
        },
        submenu: [{
            name: "item4-1-1",
            icon: "",
            event: function () {
                console.log('item4-1-1');
            },
            submenu: null,
        }, {
            name: "item4-1-2",
            icon: "",
            event: function () {
                console.log('item4-1-2');
            },
            submenu: [{
                name: "item4-1-2-1",
                icon: '',
                event: () => {
                    console.log('item4-1-2-1');
                },
                submenu: null,
            }],
        }, {
            name: "item4-1-3",
            icon: "",
            event: function () {
                console.log('item4-1-3');
            },
            submenu: null,
        }, ],
    }, {
        name: "item4-2",
        icon: "",
        event: function () {
            console.log('item4-2');
        },
        submenu: null,
    }, {
        name: "item4-3",
        icon: "",
        event: function () {
            console.log('item4-3');
        },
        submenu: null,
    }, {
        name: "item4-4",
        icon: "",
        event: function () {
            console.log('item4-4');
        },
        submenu: null,
    }, {
        name: "itme4-5",
        icon: "",
        event: function () {
            console.log('item4-5');
        },
        submenu: null,
    }, ]
}, {
    name: "item5",
    icon: "",
    event: function () {
        console.log('item5');
    },
    submenu: null
}, {
    name: "item6",
    icon: "",
    event: function () {
        console.log('item6');
    },
    submenu: null
}, ]

export default menu;