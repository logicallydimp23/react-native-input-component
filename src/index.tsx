import React, { Component, ReactNode } from "react"

import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  TextInputProps,
} from "react-native"

import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import Space from "react-native-space-component";
import Paragraph from "react-native-paragraph-component";
import { fontTypes } from "react-native-paragraph-component/src";

import {
  COLOR,
  FONT,
} from '../../../src/config/themes'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  flex0: {
    flex: 0,
  },
  labelRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRequired: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

interface Props extends TextInputProps {
  leftIcon?: string | ReactNode
  leftIconCustom?: boolean
  leftPress?: () => void
  leftIconSize?: number
  leftIconColor?: string
  rightIcon?: string | ReactNode
  rightIconCustom?: boolean
  rightPress?: () => void
  rightIconSize?: number
  rightIconColor?: string
  spacing?: number
  verticalSpacing?: number
  bordered?: boolean
  borderColor?: string
  borderFocusedColor?: string
  borderHasInputColor?: string
  borderedWidth?: number
  label?: string
  labelFontColor?: string
  labelFontType?: fontTypes
  labelFontSize?: number
  labelRowed?: boolean
  labelIcon?: string
  labelIconSize?: number
  labelIconColor?: string
  labelPress?: () => void
  labelRequired?: boolean
  font?: fontTypes
  fontSize?: number
  fontColor?: string
  value: any
  pressable?: boolean
  onPress?: () => void
  hasError?: boolean
}

interface State {
  focused: boolean
}

class Input extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false,
    }
  }
  
  renderLeftIcon = (): ReactNode => {
    const {
      leftIcon,
      leftIconCustom,
      leftPress,
      leftIconSize,
      leftIconColor,
      pressable,
    } = this.props;
    if (leftIcon) {
      if (pressable) {
        return (
          <>
            {leftIconCustom ? leftIcon : (
              <Icon name={typeof leftIcon === "string" ? leftIcon : ""} size={leftIconSize} color={leftIconColor || COLOR.WHITE} />
            )}
          </>
        )
      }
      return (
        <TouchableOpacity
          onPress={leftPress}
        >
          {leftIconCustom ? leftIcon : (
            <Icon name={typeof leftIcon === "string" ? leftIcon : ""} size={leftIconSize} color={leftIconColor || COLOR.WHITE} />
          )}
        </TouchableOpacity>
      )
    }

    return <View />
  }

  renderRightIcon = (): ReactNode => {
    const {
      rightIcon,
      rightIconCustom,
      rightPress,
      rightIconSize,
      rightIconColor,
      pressable,
    } = this.props;
    if (rightIcon) {
      if (pressable) {
        return (
          <>
            {rightIconCustom ? rightIcon : (
              <Icon name={typeof rightIcon === "string" ? rightIcon : ""} size={rightIconSize} color={rightIconColor || COLOR.WHITE} />
            )}
          </>
        )
      }
      return (
        <TouchableOpacity
          onPress={rightPress}
        >
          {rightIconCustom ? rightIcon : (
            <Icon name={typeof rightIcon === "string" ? rightIcon : ""} size={rightIconSize} color={rightIconColor || COLOR.WHITE} />
          )}
        </TouchableOpacity>
      )
    }

    return <View />
  }

  renderLabel = (): ReactNode => {
    const {
      label,
      labelFontColor,
      labelFontType,
      labelFontSize,
      labelIcon,
      labelIconSize,
      labelRowed,
      labelIconColor,
      labelPress,
      labelRequired,
      bordered,
      borderFocusedColor,
    } = this.props;
    const {
      focused,
    } = this.state;
    if (labelRowed && !labelRequired) {
      return (
        <TouchableOpacity
          style={styles.labelRow}
          onPress={labelPress}
        >
          <Paragraph
            text={label || ""}
            fontType={labelFontType || "regular"}
            size={labelFontSize || 14}
            color={((focused && bordered) ? borderFocusedColor : labelFontColor) || COLOR.WHITE}
          />
          <Icon name={labelIcon || ""} size={labelIconSize} color={labelIconColor || COLOR.BACKDROP_GRAY} />
        </TouchableOpacity>
      )
    }

    if (labelRequired && !labelRowed) {
      return (
        <View style={styles.labelRequired}>
          <Paragraph
            text={label || ""}
            fontType={labelFontType || "regular"}
            size={labelFontSize || 14}
            color={((focused && bordered) ? borderFocusedColor : labelFontColor) || COLOR.WHITE}
          />
          <Space horizontal size={5} />
          <Paragraph
            text="*"
            fontType={labelFontType || "regular"}
            size={labelFontSize || 14}
            color={COLOR.RED}
          />
        </View>
      )
    }
    if (labelRowed && labelRequired) {
      return (
        <TouchableOpacity
          style={styles.labelRow}
          onPress={labelPress}
        >
          <Paragraph
            text={label || ""}
            fontType={labelFontType || "regular"}
            size={labelFontSize || 14}
            color={((focused && bordered) ? borderFocusedColor : labelFontColor) || COLOR.WHITE}
          />
          <Paragraph
            text="*"
            fontType={labelFontType || "regular"}
            size={labelFontSize || 14}
            color={COLOR.RED}
          />
          <Icon name={labelIcon || ""} size={labelIconSize} color={labelIconColor || COLOR.BACKDROP_GRAY} />
        </TouchableOpacity>
      )
    }
    if (label) {
      return (
        <Paragraph
          text={label || ""}
          fontType={labelFontType || "regular"}
          size={labelFontSize || 14}
          color={((focused && bordered) ? borderFocusedColor : labelFontColor) || COLOR.WHITE}
        />
      )
    }

    return <View />
  }

  calculateBorderColor = (focused: boolean, focusColor?: string, hasInput?: boolean, hasInputColor?: string): string => {
    const { borderColor, hasError } = this.props;
    if (hasError) {
      return COLOR.RED
    }
    if (focused) {
      return focusColor || COLOR.WHITE
    }
    if (hasInput) {
      return hasInputColor || COLOR.WHITE
    }
    return borderColor || COLOR.WHITE
  }

  identifyFontType = (): any => {
    const {
      font,
    } = this.props;

    switch (font) {
      case 'light':
        return FONT.light;
      case 'bold':
        return FONT.bold;
      case 'lightItalic':
        return FONT.lightItalic;
      case 'italic':
        return FONT.italic;
      case 'boldItalic':
        return FONT.boldItalic;
      default:
        return FONT.regular;
    }
  }

  render() {
    const {
      bordered,
      borderFocusedColor,
      borderHasInputColor,
      borderedWidth,
      fontSize,
      fontColor,
      spacing,
      verticalSpacing,
      value,
      onFocus,
      pressable,
      onPress,
    } = this.props;
    const { focused } = this.state;
    if (pressable) {
      return (
        <TouchableOpacity
          style={{
            ...styles.container,
            ...bordered && {
              borderBottomWidth: borderedWidth || 1,
              borderColor: this.calculateBorderColor(focused, borderFocusedColor, value && value.length > 0, borderHasInputColor),
            },
            paddingHorizontal: spacing || 0,
            paddingVertical: verticalSpacing || 0,
          }}
          onPress={onPress}
        >
          <>
            {this.renderLabel()}
            <View style={styles.inputContainer}>
              <View style={styles.flex0}>
                {this.renderLeftIcon()}
              </View>
              <View style={styles.flex1}>
                <Paragraph
                  text={value}
                  fontType={this.identifyFontType() || "regular"}
                  size={fontSize || 14}
                  color={fontColor || COLOR.WHITE}
                />
              </View>
              <View style={styles.flex0}>
                {this.renderRightIcon()}
              </View>
            </View>
          </>
        </TouchableOpacity>
      )
    }
    return (
      <View
        style={{
          ...styles.container,
          ...bordered && {
            borderBottomWidth: borderedWidth || 1,
            borderColor: this.calculateBorderColor(focused, borderFocusedColor, value && value.length > 0, borderHasInputColor),
          },
          paddingHorizontal: spacing || 0,
        }}
      >
        <>
          {this.renderLabel()}
          <View style={styles.inputContainer}>
            <View style={styles.flex0}>
              {this.renderLeftIcon()}
            </View>
            <View style={styles.flex1}>
              <TextInput
                style={{
                  fontFamily: this.identifyFontType() || FONT.regular,
                  fontSize: fontSize || 14,
                  color: fontColor || COLOR.WHITE,
                  paddingLeft: spacing || 0,
                  paddingRight: spacing || 0,
                  paddingTop: verticalSpacing || Platform.OS === "ios" ? 5 : 0,
                  paddingBottom: verticalSpacing || Platform.OS === "ios" ? 5 : 0,
                  margin: 0,
                }}
                autoCapitalize="none"
                onFocus={() => {
                  this.setState({
                    focused: true,
                  }, () => {
                    return this.props.onFocus ? onFocus : null;
                  })
                }}
                onEndEditing={() => this.setState({ focused: false })}
                {...this.props}
              />
            </View>
            <View style={styles.flex0}>
              {this.renderRightIcon()}
            </View>
          </View>
        </>
      </View>
    )
  }
}

export default Input;
