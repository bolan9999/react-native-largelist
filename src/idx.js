/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/9/23
 *
 */

export function idx<T>(f: () => T, defaultValue?: T | string) {
  try {
    const res = f();
    return res === null || res === undefined || isNaN(res) ? defaultValue : res;
  } catch (e) {
    return defaultValue;
  }
}
