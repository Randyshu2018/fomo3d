
# FoMo3D

## 工具安装及启动
ganache-cli
<pre>
npm install -g ganache-cli
</pre>
这里有个属性很重要allowUnlimitedContractSize(Allows unlimited contract sizes while debugging)
<pre>
ganache-cli -l 20000000000 --allowUnlimitedContractSize
</pre>

remix(建议用remix-ide)
<pre>
npm install -g remix-ide
</pre>
<pre>
remix-ide
</pre>

## 合约地址
FoMo3DWorld(精简版)

FoMo3DWorld:
https://etherscan.io/address/0xf1ae594cefee0bf519f227f3262ee2a851b14b9a#code

PlayerBook:
https://etherscan.io/address/0x789C537cE585595596D3905f401235f5A85B11d7#code

FoMo3Dlong(原版)

https://etherscan.io/address/0xa62142888aba8370742be823c1782d17a0389da1#code

为了方便，笔者这里使用精简版(原版需要进行合约拆分以及闭源合约的实现)

## 合约编译和部署
remix-ide配置
1. 打开remix-ide, 勾选Compile下的Autocompile
2. 将Run一栏下的Environment设置为Injected Web3(配合metamask使用)

拷贝合约

合约编译
1. 首先编译PlayerBook合约
2. 将FoMo3DWorld中的PlayerBookInterface的合约地址替换为PlayerBook合约地址
3. 编译FoMo3DWorld合约

## 游戏激活
1. 首先调用PlayerBook合约下的addGame方法,形如:
<pre>
{
	"address _gameAddress": "3b2970ebeF19d241965744115396ca01EeA811da",
	"string _gameNameStr": "f3dw"
}
</pre>
==注意== 

_gameAddress不能以0x开头，所以这里改用去掉0x的FoMo3dWorld合约地址字符串.

调用的时候适度增加gas可以提高成功率哟.


2. 激活合约

调用FoMo3DWorld的active方法

到这里我们的合约就部署完成了

## 前端页面
1. 直接ctrl+s下载原版页面
2. 替换合约地址
3. 修改provider地址

## 项目启动
直接npm run dev

## 常见问题及解答
1. out of gas 、Exceeds block gas limit和oversized data
<pre>
这是由于合约太大，建议拆解合约、设置optimize(测试网的话，比如ganache-cli 可以设置allowUnlimitedContractSize属性)
</pre>
2. remix调试合约，经常报错revert(特别是这个引用外部合约的合约，debugger难以定位准确)
<pre>
这种情况建立将Remix-Run-Environment设置为JavaScript vm(相信我，这绝对是个调试神器)
</pre>

