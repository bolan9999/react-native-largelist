<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-28 16:40:47
 * @LastEditors: 石破天惊
 * @Description: 
-->
# 快速接入

### 全新安装命令
```
yarn add react-native-spring-scrollview react-native-largelist
```
RN 0.50-0.59 without pod
```
react-native link react-native-spring-scrollview
```
RN 0.60+ with pod
```
npx pod-install
```

如果没有异常情况，原生端就已经安装好了。为了稳妥起见，您还是应该手动检查原生端的配置是否正确

### 检查原生端是否链接正确(0.50-0.59)

##### iOS
* 检查 `您的项目 ==> Libraries ==> RNSpringScrollView.xcodeproj` 是否已添加到您的项目中
* 检查 `您的项目设置 ==> TARGETS ==> BuildPhases ==> Link Binary With Libraries ==> libRNSpringScrollView.a`
是否链接到您的项目中

##### Android
* 检查`YourProject/android/settings.gradle`是否包含了如下信息
```
include ':react-native-spring-scrollview'
project(':react-native-spring-scrollview').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-spring-scrollview/android')
```

* 检查`YourProject/android/app/build.gradle`是否包含了以下信息
```
dependencies {
    compile project(':react-native-spring-scrollview')
    compile fileTree(include: ['*.jar'], dir: 'libs')
    compile 'com.android.support:appcompat-v7:26.0.0'
    compile 'com.facebook.react:react-native:+'
    // From node_modules
}
```

* 检查'MainApplication.java'是否加入了`new SpringScrollViewPackage()`
```
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new SpringScrollViewPackage()
    );
}
```

### 在V2的项目上升级到V3

V3已经独立成为一个单独的库，您可以直接删除react-native-largelist-v2和react-native-spring-scrollview重新安装。当然您的项目其他地方如果没有使用react-native-gesture-handler，也可以删除（记得删除原生端配置）。

### iOS常见接入问题
1. 编译找不到`RCTXXXX.h`文件：

   可以参看[这里](https://github.com/facebook/react-native/issues/22000#issuecomment-438201084)
   
2. Pod安装
    
    在您的项目pod文件里加入如下内容后pod install
    ```
    pod 'RNSpringScrollView', :path => '../node_modules/react-native-spring-scrollview/ios'
    ```

### Android常见接入问题

1. 找不到`android/drawable/XXXXXX`, '`android/res/XXXXXX`'等文件。

检查android编译版本问题，本库编译版本是26，可以尝试修改您的版本号，或者修改本库版本号；

检查`YourProject/android/app/build.gradle`是否包含了谷歌的代码仓库
```
allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            url 'https://maven.google.com'
        }
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```
