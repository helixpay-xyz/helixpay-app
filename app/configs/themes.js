import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

const lightTheme = {
    none: {},
    background: colors.contentColor,
    primary: colors.primaryColor,
    hide: colors.hideColor,
    icon: colors.primaryTextColor,
    skeleton: colors.lineColor,
    navigation: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.primaryColor,
            background: colors.contentColor,
            card: colors.contentColor,
            text: colors.primaryTextColor,
            border: colors.lineColor,
            notification: colors.badgeColor
        }
    },
    elements: {
        colors: {
            scheme: 'light',
            background: colors.contentColor,
            primary: colors.primaryColor,
            secondary: colors.secondaryColor,
            third: colors.thirdColor,
            accent: colors.accentColor,
            grey0: colors.primaryTextColor,
            grey1: colors.secondaryTextColor,
            grey2: colors.secondaryTextColor,
            grey3: colors.tertiaryTextColor,
            grey4: colors.tertiaryTextColor,
            grey5: colors.tertiaryTextColor,
            error: colors.errorTextColor,
            divider: colors.lineColor,
            badge: colors.badgeColor,
            hide: colors.hideColor,
            hint: colors.hintColor,
            gray: colors.grayColor
        },
        Badge: {
            badgeStyle: {
                borderWidth: 0
            }
        },
        Button: {
            buttonStyle: {
                borderRadius: 15
            },
            titleProps: {
                allowFontScaling: false
            },
            titleStyle: {
                fontFamily: 'GoogleSans-Regular',
            },
            disabledTitleStyle: {
                color: colors.tertiaryTextColor,
                fontFamily: 'GoogleSans-Regular'
            }
        },
        ButtonGroup: {
            containerStyle: {
                height: 30,
                marginVertical: 7.5,
                borderWidth: 0
            },
            buttonStyle: {
                backgroundColor: colors.hideColor
            },
            selectedButtonStyle: {
                backgroundColor: colors.primaryTextColor
            },
            textStyle: {
                fontSize: dimens.normalText,
                color: colors.primaryTextColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular'
            },
            selectedTextStyle: {
                fontSize: dimens.normalText,
                color: colors.primaryColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular'
            },
            innerBorderStyle: {
                color: colors.lineColor
            }
        },
        CheckBox: {
            containerStyle: {
                flex: 1,
                backgroundColor: 'transparent',
                margin: 0,
                marginLeft: 0,
                marginRight: 0,
                padding: 0,
                borderRadius: 0,
                borderWidth: 0
            },
            checkedColor: colors.primaryColor,
            uncheckedColor: colors.primaryTextColor,
            textStyle: {
                flex: 1,
                fontSize: dimens.mediumText,
                color: colors.primaryTextColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular',
                marginLeft: 10,
                marginRight: 0
            }
        },
        Chip: {
            buttonStyle: {
                paddingVertical: 5,
                paddingHorizontal: 10
            },
            titleStyle: {
                fontSize: dimens.mediumText,
                fontFamily: 'GoogleSans-Regular'
            }
        },
        Divider: {
            backgroundColor: colors.lineColor
        },
        Image: {
            placeholderStyle: {
                backgroundColor: colors.hideColor
            }
        },
        Input: {
            containerStyle: {
                paddingHorizontal: 0
            },
            labelStyle: {
                fontSize: dimens.mediumText,
                color: colors.secondaryTextColor,
                fontWeight: '300',
                fontFamily: 'GoogleSans-Light',
                marginBottom: 10
            },
            inputContainerStyle: {
                height: 50,
                borderWidth: 1,
                borderColor: colors.lineColor,
                borderRadius: 15
            },
            inputStyle: {
                height: 50,
                paddingVertical: 0,
                paddingHorizontal: 15,
                fontSize: dimens.mediumText,
                color: colors.primaryTextColor,
                fontFamily: 'GoogleSans-Regular'
            },
            errorStyle: {
                fontSize: dimens.smallText,
                color: colors.errorTextColor,
                fontFamily: 'GoogleSans-Regular'
            }
        }
    },
    html: {
        p: {
            fontSize: dimens.mediumText,
            color: colors.primaryTextColor,
            fontFamily: 'GoogleSans-Regular'
        },
        b: {
            fontSize: dimens.mediumText,
            color: colors.primaryTextColor,
            fontFamily: 'GoogleSans-Bold'
        },
        a: {
            fontSize: dimens.mediumText,
            color: colors.primaryColor,
            fontFamily: 'GoogleSans-Regular',
            textDecorationLine: 'underline'
        }
    },
    calendar: {
        backgroundColor: colors.contentColor,
        calendarBackground: colors.contentColor,
        reservationsBackgroundColor: colors.contentColor,
        selectedDayBackgroundColor: colors.primaryColor,
        selectedDayTextColor: colors.white,
        todayTextColor: colors.badgeColor,
        dayTextColor: colors.primaryTextColor,
        textDisabledColor: colors.hideColor,
        dotColor: colors.primaryColor,
        selectedDotColor: colors.white,
        arrowColor: colors.primaryColor,
        monthTextColor: colors.primaryTextColor,
        textSectionTitleColor: colors.primaryTextColor,
        textDayFontWeight: 'bold',
        agendaDayTextColor: colors.secondaryTextColor,
        agendaDayNumColor: colors.primaryTextColor
    },
    container: {
        backgroundColor: colors.contentColor
    },
    content: {
        backgroundColor: colors.contentColor
    },
    overlay: {
        backgroundColor: colors.contentColor
    },
    border: {
        borderColor: colors.lineColor,
        borderLeftColor: colors.lineColor
    },
    menu: {
        backgroundColor: colors.contentColor
    },
    divider: {
        borderColor: colors.lineColor
    },
    space: {
        backgroundColor: colors.hideColor
    },
    shadow: {
        shadowColor: colors.shadowColor
    },
    heading: {
        color: colors.primaryTextColor
    },
    label: {
        color: colors.primaryColor
    },
    title: {
        color: colors.primaryTextColor
    },
    text: {
        color: colors.primaryTextColor
    },
    subtext: {
        color: colors.secondaryTextColor
    },
    caption: {
        color: colors.tertiaryTextColor
    },
    error: {
        color: colors.errorTextColor
    },
    code: {
        color: colors.primaryTextColor,
        borderColor: colors.lineColor
    },
    input: {
        color: colors.primaryTextColor
    },
    knob: {
        backgroundColor: colors.lineColor
    },
    sheet: {
        backgroundColor: colors.contentColor
    },
    active: {
        color: colors.primaryColor
    },
    inactive: {
        color: colors.hideColor
    },
    popup: {
        backgroundColor: colors.contentColor
    },
    negative: {
        color: colors.primaryTextColor
    },
    positive: {
        color: colors.primaryColor
    },
    separator: {
        backgroundColor: colors.lineColor
    },
    stroke: {
        backgroundColor: colors.lineColor
    },
    wave: {
        borderColor: colors.lineColor
    },
    pie: {
        backgroundColor: colors.contentColor
    },
    footer: {
        borderColor: colors.lineColor
    }
};

const darkTheme = {
    none: {},
    background: colors.contentDarkColor,
    primary: colors.primaryDarkColor,
    hide: colors.hideDarkColor,
    icon: colors.primaryTextDarkColor,
    skeleton: colors.lineDarkColor,
    navigation: {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: colors.primaryDarkColor,
            background: colors.contentDarkColor,
            card: colors.contentDarkColor,
            text: colors.primaryTextDarkColor,
            border: colors.lineDarkColor,
            notification: colors.badgeDarkColor
        }
    },
    elements: {
        colors: {
            scheme: 'dark',
            background: colors.contentDarkColor,
            primary: colors.primaryDarkColor,
            secondary: colors.secondaryDarkColor,
            third: colors.thirdDarkColor,
            accent: colors.accentDarkColor,
            grey0: colors.primaryTextDarkColor,
            grey1: colors.secondaryTextDarkColor,
            grey2: colors.secondaryTextDarkColor,
            grey3: colors.tertiaryTextDarkColor,
            grey4: colors.tertiaryTextDarkColor,
            grey5: colors.tertiaryTextDarkColor,
            error: colors.errorTextDarkColor,
            divider: colors.lineDarkColor,
            badge: colors.badgeDarkColor,
            hide: colors.hideDarkColor,
            hint: colors.hintDarkColor,
            gray: colors.grayDarkColor
        },
        Badge: {
            badgeStyle: {
                borderWidth: 0
            }
        },
        Button: {
            buttonStyle: {
                borderRadius: 15
            },
            titleProps: {
                allowFontScaling: false
            },
            titleStyle: {
                fontFamily: 'GoogleSans-Regular',
            },
            disabledTitleStyle: {
                color: colors.tertiaryTextDarkColor,
                fontFamily: 'GoogleSans-Regular'
            }
        },
        ButtonGroup: {
            containerStyle: {
                height: 30,
                marginVertical: 7.5,
                borderWidth: 0
            },
            buttonStyle: {
                backgroundColor: colors.hideDarkColor
            },
            selectedButtonStyle: {
                backgroundColor: colors.primaryTextDarkColor
            },
            textStyle: {
                fontSize: dimens.normalText,
                color: colors.primaryTextDarkColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular'
            },
            selectedTextStyle: {
                fontSize: dimens.normalText,
                color: colors.primaryDarkColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular'
            },
            innerBorderStyle: {
                color: colors.lineDarkColor
            }
        },
        CheckBox: {
            containerStyle: {
                flex: 1,
                backgroundColor: 'transparent',
                margin: 0,
                marginLeft: 0,
                marginRight: 0,
                padding: 0,
                borderRadius: 0,
                borderWidth: 0
            },
            checkedColor: colors.primaryDarkColor,
            uncheckedColor: colors.primaryTextDarkColor,
            textStyle: {
                flex: 1,
                fontSize: dimens.mediumText,
                color: colors.primaryTextDarkColor,
                fontWeight: 'normal',
                fontFamily: 'GoogleSans-Regular',
                marginLeft: 10,
                marginRight: 0
            }
        },
        Chip: {
            buttonStyle: {
                paddingVertical: 5,
                paddingHorizontal: 10
            },
            titleStyle: {
                fontSize: dimens.mediumText,
                fontFamily: 'GoogleSans-Regular'
            }
        },
        Divider: {
            backgroundColor: colors.lineDarkColor
        },
        Image: {
            placeholderStyle: {
                backgroundColor: colors.hideDarkColor
            }
        },
        Input: {
            containerStyle: {
                paddingHorizontal: 0
            },
            labelStyle: {
                fontSize: dimens.mediumText,
                color: colors.secondaryTextDarkColor,
                fontWeight: '300',
                fontFamily: 'GoogleSans-Light',
                marginBottom: 10
            },
            inputContainerStyle: {
                height: 50,
                borderWidth: 1,
                borderColor: colors.lineDarkColor,
                borderRadius: 15
            },
            inputStyle: {
                height: 50,
                paddingVertical: 0,
                paddingHorizontal: 15,
                fontSize: dimens.mediumText,
                color: colors.primaryTextDarkColor,
                fontFamily: 'GoogleSans-Regular'
            },
            errorStyle: {
                fontSize: dimens.smallText,
                color: colors.errorTextDarkColor,
                fontFamily: 'GoogleSans-Regular'
            }
        }
    },
    html: {
        p: {
            fontSize: dimens.mediumText,
            color: colors.primaryTextDarkColor,
            fontFamily: 'GoogleSans-Regular'
        },
        b: {
            fontSize: dimens.mediumText,
            color: colors.primaryTextDarkColor,
            fontFamily: 'GoogleSans-Bold'
        },
        a: {
            fontSize: dimens.mediumText,
            color: colors.primaryDarkColor,
            fontFamily: 'GoogleSans-Regular',
            textDecorationLine: 'underline'
        }
    },
    calendar: {
        backgroundColor: colors.contentDarkColor,
        calendarBackground: colors.contentDarkColor,
        reservationsBackgroundColor: colors.contentDarkColor,
        selectedDayBackgroundColor: colors.primaryDarkColor,
        selectedDayTextColor: colors.white,
        todayTextColor: colors.badgeDarkColor,
        dayTextColor: colors.primaryTextDarkColor,
        textDisabledColor: colors.hideDarkColor,
        dotColor: colors.primaryDarkColor,
        selectedDotColor: colors.white,
        arrowColor: colors.primaryDarkColor,
        monthTextColor: colors.primaryTextDarkColor,
        textSectionTitleColor: colors.primaryTextDarkColor,
        textDayFontWeight: 'bold',
        agendaDayTextColor: colors.secondaryTextDarkColor,
        agendaDayNumColor: colors.primaryTextDarkColor
    },
    container: {
        backgroundColor: colors.contentDarkColor
    },
    content: {
        backgroundColor: colors.contentDarkColor
    },
    overlay: {
        backgroundColor: colors.contentDarkColor
    },
    border: {
        borderColor: colors.lineDarkColor,
        borderLeftColor: colors.lineDarkColor
    },
    menu: {
        backgroundColor: colors.contentDarkColor
    },
    divider: {
        borderColor: colors.lineDarkColor
    },
    space: {
        backgroundColor: colors.hideDarkColor
    },
    shadow: {
        shadowColor: colors.shadowDarkColor
    },
    heading: {
        color: colors.primaryTextDarkColor
    },
    label: {
        color: colors.primaryDarkColor
    },
    title: {
        color: colors.primaryTextDarkColor
    },
    text: {
        color: colors.primaryTextDarkColor
    },
    subtext: {
        color: colors.secondaryTextDarkColor
    },
    caption: {
        color: colors.tertiaryTextDarkColor
    },
    error: {
        color: colors.errorTextDarkColor
    },
    code: {
        color: colors.primaryTextDarkColor,
        borderColor: colors.lineDarkColor
    },
    input: {
        color: colors.primaryTextDarkColor
    },
    knob: {
        backgroundColor: colors.lineDarkColor
    },
    sheet: {
        backgroundColor: colors.contentDarkColor
    },
    active: {
        color: colors.primaryDarkColor
    },
    inactive: {
        color: colors.hideDarkColor
    },
    popup: {
        backgroundColor: colors.contentDarkColor
    },
    negative: {
        color: colors.primaryTextDarkColor
    },
    positive: {
        color: colors.primaryDarkColor
    },
    separator: {
        backgroundColor: colors.lineDarkColor
    },
    stroke: {
        backgroundColor: colors.lineDarkColor
    },
    wave: {
        borderColor: colors.lineDarkColor
    },
    pie: {
        backgroundColor: colors.contentDarkColor
    },
    footer: {
        borderColor: colors.lineDarkColor
    }
};

export function helpers(name, theme) {
    return theme === 'dark' ? darkTheme[name] : lightTheme[name];
}
