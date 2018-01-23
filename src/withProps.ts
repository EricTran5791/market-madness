import { ThemedStyledFunction } from 'styled-components';

/** This is an unfortunate workaround to provide props to styled elements in Typescript:
 *  https://github.com/styled-components/styled-components/issues/630
 */
export const withProps = <U>() => <P, T, O>(
  fn: ThemedStyledFunction<P, T, O>
) => fn as ThemedStyledFunction<P & U, T, O & U>;
