/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/17
 *
 */

export type LargeListDataType = { items: any[] }[];

export interface IndexPath {
  section:number;
  row:number;
}

export interface LargeListPropType {
  data: LargeListDataType,
  heightForSection?: (section: number) => number,
  heightForIndexPath: (indexPath: IndexPath)=>number,
  renderSection?:(section:number)=>React.Node<any>,
  renderIndexPath: (indexPath:IndexPath)=>React.Node<any>,
}

export interface GroupPropType {
  indexes: IndexPath[];
  data: LargeListDataType,
  heightForSection?: (section: number) => number,
  heightForIndexPath: (indexPath: IndexPath)=>number,
  renderSection?:(section:number)=>React.Node<any>,
  renderIndexPath: (indexPath:IndexPath)=>React.Node<any>,
}
