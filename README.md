# kenote-react-admin

基于 React 和 Antd.Design 技术的后台管理平台

[![React](https://img.shields.io/badge/react-^15.6.2-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![Ant Design](https://img.shields.io/badge/ant--design-^2.13.6-yellowgreen.svg?style=flat-square)](https://github.com/ant-design/ant-design)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## Usages

克隆项目
```bash
git clone https://github.com/thondery/kenote-react-admin.git
```

安装依赖
```bash
npm i 或 yarn
```

添加配置
```bash
node-react config

? root: (./src/config) -> 
? domain (http://localhost:4000) ->
? apiPath (/api/v1) ->

    config set sccuess!

```

编译依赖包
```bash
npm run compile:dll
```

开发
```bash
npm run dev
```

构建
```bash
npm run build
```

### 目录结构

```bash
├── /dist/                 # 项目输出目录
├── /src/                  # 项目源码目录
│ ├── /assets/             # 资源文件
│ ├── /components/         # UI组件
│ ├── /config/             # 配置文件
│ ├── /containers/         # 应用主入口
│ ├── /features/           # 导航页面
│ ├── /layouts/            # 页面布局
│ ├── /passport/           # 帐号相关界面，例如登录界面
│ ├── /redux/              # Redux文件
│ ├── /services/           # 数据存储相关
│ ├── /store/              # store配置
│ ├── /styles/             # 全局样式
│ ├── index.js             # 入口文件
│ └── index.html           # 入口文件的html
├── package.json           # 项目信息
├── postcss.config.js      # postcss配置
├── webpack.config.js      # webpack配置
├── webpack.dll.config.js  # webpack dll配置
└── .babelrc               # babel配置
```

## License

this repo is released under the [MIT License](https://github.com/thondery/kenote-react-admin/blob/master/LICENSE).