import React, { PureComponent } from 'react'

import {
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TextInputIOSProps,
} from 'react-native'

type fontTypes = 'light' | 'bold' | 'regular' | 'lightItalic' | 'italic' | 'boldItalic'

export interface InputProps extends TextInputProps, TextInputIOSProps {
  backdropColor?: string;
  /**
   * if `true` `elevation` prop will be required for the `shadow` to work.
   */
  shadow?: boolean;
  /**
   * `nullified` if `shadow` is `false`. (so it is dependent on the `shadow` prop).
   *
   * `value` must be 1 or greater for `shadow` to work.
   */
  elevation?: number;
  spacing?: number;
  verticalSpacing?: number;
  borderRadius?: number;
  /**
   * if it has a `value` you need to pass `borderColor` prop otherwise it will return a `transparent` color.
   */
  borderWidth?: number;
  borderColor?: string;
  /**
   * if `true` `leftIcon` can be tapped.
   */
  leftButton?: boolean;
  /**
   * callback if `leftButton` is true nad tapped.
   */
  leftButtonPress?: () => void;
  leftIcon?: string;
  leftIconSize?: number;
  leftIconColor?: string;
  leftBorderColor?: string;
  leftBorderThickness?: number;
  rightButton?: boolean;
  rightButtonPress?: () => void;
  rightIcon?: string;
  rightIconSize?: number;
  rightIconColor?: string;
  rightBorderColor?: string;
  rightBorderThickness?: number;
  placeholderColor?: string;
  secureText?: boolean;
  /**
   * if `true` the `placeholder` and `value` text will be on the center.
   */
  center?: boolean;
  /**
   * size of the font for `placeholder` and `value`.
   */
  inputSize?: number;
  /**
    * This can be one of the following values:
    *
    * - `light` -  Thinner font
    * - `bold` - Heavier font
    * - `regular` - Common font
    *
    * > See `config/constants/themes/Fonts.js` for font values.
    * > The default is `regular`.
    */
  fontType?: fontTypes;
  fontColor?: string;
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
}

/**
 * Input
 *
 * Made from TextInput. TextInput props are supported.
 *
 * See https://react-native-halcyon.github.io/documentation/docs/components/input
 */
export class Input extends PureComponent<InputProps> { }