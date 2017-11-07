# STTVTableView
**STTVTableView** is a high performance TableView for React Native(iOS only right row, Android will support on version 1.0.0).

## Getting Started

iOS:

* Make sure your project is react-native project.
* Using this command to install:

```
npm add sttv-tableview
```
* Make sure your iOS project's setting: Project(or Target) --> build setting -->Other Link Flags have the option of '-ObjC'.
* Drag " ${ProjectPath}/node_modules/sttv-tableview/ios/STTVTableView.xcodeproj " to your iOS project and make sure STTVTableView.framework is linked to your project.
* Using it like this:

```
import { TableView } from "sttv-tableview";

//other code
...
<TableView
	ref={ref => (this.ref = ref)}
	style={{ flex: 1, backgroundColor: "red" }}
	bounces={true}
	refreshable={true}
	onTopRefresh={() => console.log("refreshing")}
	numberOfRowsInSection={section => 3000}
	numberOfSections={1}
	heightForCell={(section, row) => (row % 2 ? 48 : 96)}
	renderCell={this.renderItem.bind(this)}
	renderSection={section =>
		<View
			style={{
				flex: 1,
				backgroundColor: "gray",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text>
				I am section {section}
			</Text>
		</View>}
	heightForSection={section => (section % 2 ? 40 : 80)}
	renderHeader={() =>
		<View
			style={{
				height: 100,
				backgroundColor: "rgb(245,245,245)",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text>I am header</Text>
		</View>}
	renderFooter={() =>
		<View
			style={{
				height: 100,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text>I am footer</Text>
		</View>}
	/>
...
```
