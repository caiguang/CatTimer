
class OtherUi {
    constructor() {
        this.topMenuPanelElement = document.querySelector("#topMenu .menu");
        this.openTopMenuButtonElement = document.querySelector("#topMenu .openButton");
        this.closeTopMenuButtonElement = document.querySelector("#topMenu .menu .buttons .close");
        let onClickOpenTopMenuButton = this.OnClickOpenTopMenuButton.bind(this);
        let onClickCloseTopMenuButton = this.OnClickCloseTopMenuButton.bind(this);
        // this.openTopMenuButtonElement.onclick = onClickOpenTopMenuButton;
        // this.closeTopMenuButtonElement.onclick = onClickCloseTopMenuButton;
    }

    OnClickOpenTopMenuButton() {
        this.topMenuPanelElement.style.top = "0px";
    }

    OnClickCloseTopMenuButton() {
        this.topMenuPanelElement.style.top = "-115px";
    }
}

class SupportIosTool {
    constructor() {
        this.isIos = false;
        this.buttonDownAudio = document.querySelector("#audios .buttonDown");
        this.completeAudio = document.querySelector("#audios .complete");
        this.catUpAudio = document.querySelector("#audios .catUp1");
    }

    get IsIos() {
        return this.isIos;
    }

    SupportIos() {
        let _userAgent = navigator.userAgent;
        this.isIos = !!_userAgent.match(/iPhone|iPod|iPad|ios|mac/i);
        if (this.isIos == true) {
            let _head = document.querySelector("head");
            let _style = document.createElement("style");
            let _textNode = document.createTextNode("*{-webkit-user-select: none;}input{-webkit-appearance:none;border: 0px;}#timingUi .clock *{line-height: 240px;}#countdownUi .time .timeText{line-height: 270px;}#timingUi .changeClockInput .minute .input {padding: 0px;margin: -10px 0px 0px 0px;height: 100%;font-size: 180px;}#timingUi .changeClockInput .seconds .input {padding: 0px;margin: -10px 0px 0px 0px;height: 100%;font-size: 180px;}");
            _style.appendChild(_textNode);
            _head.appendChild(_style);
        }
    }

    PlayAudio(_audioType) {
        if (TimerApp.Datas.volume <= 0)
            return;
        switch (_audioType) {
            case AudioType.ButtonDown:
                this.buttonDownAudio.play();
                break;
            case AudioType.ButtonUp:
                break;
            case AudioType.AddOrlessNumber:
                break;
            case AudioType.Complete:
                this.completeAudio.play();
                break;
            case AudioType.CatUp:
                this.catUpAudio.play();
                break;
            case AudioType.CatDown:
                break;
        }
    }
}

class SupportMobileTool {
    constructor() {
        this.isMobile = false;
        this.isTouchStartBlackCatOpenMouth = false;
        this.isTouchStartYellowCatOpenMouth = false;
        this.inputVolumeSliderPanelElement = document.querySelector("#settingUi .inputVolumeSlider");
        this.inputVolumeSliderElement = document.querySelector("#settingUi .inputVolumeSlider .input");
        this.volumeNumberPanelElement = document.querySelector("#settingUi .volumeNumber");
        this.volumeNumberTextElement = document.querySelector("#settingUi .volumeNumber .number");
        this.blackCatRopeElement = document.querySelector("#countdownUi .blackCat .rope");
        this.blackCatOpenMouthElement = document.querySelector("#countdownUi .blackCat .cat .mouth");
        this.blackCatCloseMouthElement = document.querySelector("#countdownUi .blackCat .cat .close");
        this.yellowCatRopeElement = document.querySelector("#countdownUi .yellowCat .rope");
        this.yellowCatOpenMouthElement = document.querySelector("#countdownUi .yellowCat .cat .mouth");
        this.yellowCatCloseMouthElement = document.querySelector("#countdownUi .yellowCat .cat .close");
        this.yellowCatPauseTextElement = document.querySelector("#countdownUi .yellowCat .rope .text .pause");
        this.yellowCatResumeTextElement = document.querySelector("#countdownUi .yellowCat .rope .text .resume");
        this.pausedPanelElement = document.querySelector("#countdownUi .paused");
        this.pausedTimeTextElement = document.querySelector("#countdownUi .paused .timeText");
    }

    get IsMobile() {
        return this.isMobile;
    }

    SupportMobile() {
        if (this.isMobile == true)
            return;
        this.isMobile = true;
        let _volumeSliderPanelElement = document.querySelector("#settingUi .volumeSlider");
        _volumeSliderPanelElement.style.display = "none";
        this.inputVolumeSliderPanelElement.style.display = "block";
        let onTouchStartInputVolumeSliderPanel = this.OnTouchStartInputVolumeSliderPanel.bind(this);
        let onTouchEndInputVolumeSliderPanel = this.OnTouchEndInputVolumeSliderPanel.bind(this);
        let onValueChangeInputVolumeSlider = this.OnValueChangeInputVolumeSlider.bind(this);
        this.inputVolumeSliderPanelElement.ontouchstart = onTouchStartInputVolumeSliderPanel;
        this.inputVolumeSliderPanelElement.ontouchend = onTouchEndInputVolumeSliderPanel;
        this.inputVolumeSliderElement.onchange = onValueChangeInputVolumeSlider;
        let onTouchStartYellowCatMouthButton = this.OnTouchStartYellowCatMouthButton.bind(this);
        let onTouchEndYellowCatMouthButton = this.OnTouchEndYellowCatMouthButton.bind(this);
        let onTouchStartBlackCatMouthButton = this.OnTouchStartBlackCatMouthButton.bind(this);
        let onTouchEndBlackCatMouthButton = this.OnTouchEndBlackCatMouthButton.bind(this);
        this.yellowCatOpenMouthElement.ontouchstart = onTouchStartYellowCatMouthButton;
        this.yellowCatOpenMouthElement.ontouchend = onTouchEndYellowCatMouthButton;
        this.yellowCatOpenMouthElement.onclick = this.OnClickYellowCatMouthButton;
        this.yellowCatOpenMouthElement.onmousedown = this.OnMouseDownYellowCatMouthButton;
        this.blackCatOpenMouthElement.ontouchstart = onTouchStartBlackCatMouthButton;
        this.blackCatOpenMouthElement.ontouchend = onTouchEndBlackCatMouthButton;
        this.blackCatOpenMouthElement.onclick = this.OnClickBlackCatMouthButton;
        this.blackCatOpenMouthElement.onmousedown = this.OnMouseDownBlackCatMouthButton;
    }

    OnTouchStartInputVolumeSliderPanel() {
        this.volumeNumberPanelElement.style.opacity = "1";
    }

    OnTouchEndInputVolumeSliderPanel() {
        this.volumeNumberPanelElement.style.opacity = "0";
    }

    OnValueChangeInputVolumeSlider() {
        let _value = window.parseInt(this.inputVolumeSliderElement.value);
        if (TimerApp.Datas.volume == _value)
            return;
        TimerApp.Datas.volume = _value;
        this.volumeNumberTextElement.innerText = _value + "";
        TimerApp.Systems.AudioSystem.UpdateVolume(TimerApp.Datas.volume);
        TimerApp.Systems.SaveSystem.Save();
    }

    OnTouchStartYellowCatMouthButton() {
        this.isTouchStartYellowCatOpenMouth = true;
        this.yellowCatOpenMouthElement.style.transform = "scale(0.75)";
        this.yellowCatCloseMouthElement.style.opacity = "1";
        this.yellowCatCloseMouthElement.style.transform = "scale(1,1)";
        this.yellowCatRopeElement.style.animationPlayState = "paused";
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
    }

    OnTouchEndYellowCatMouthButton(e) {
        this.yellowCatOpenMouthElement.style.transform = "scale(1)";
        this.yellowCatCloseMouthElement.style.opacity = "0";
        this.yellowCatCloseMouthElement.style.transform = "scale(1,0.8)";
        this.yellowCatRopeElement.style.animationPlayState = "running";
        if (this.isTouchStartYellowCatOpenMouth == true) {
            if (this.pausedPanelElement.style.visibility != "visible") {
                if (TimerApp.Datas.currentState == StateType.Run) {
                    TimerApp.Datas.currentState = StateType.Pause;
                }
                this.yellowCatPauseTextElement.style.opacity = "0";
                this.yellowCatResumeTextElement.style.opacity = "1";
                this.pausedTimeTextElement.innerText = TimerApp.Datas.currentTime.ToString();
                this.pausedPanelElement.style.visibility = "visible";
            } else {
                if (TimerApp.Datas.currentState == StateType.Pause) {
                    TimerApp.Datas.currentState = StateType.Run;
                }
                this.yellowCatPauseTextElement.style.opacity = "1";
                this.yellowCatResumeTextElement.style.opacity = "0";
                this.pausedPanelElement.style.visibility = "hidden";
            }
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonUp);
        }
        this.isTouchStartYellowCatOpenMouth = false;
        e.preventDefault();
    }

    OnClickYellowCatMouthButton() {
    }

    OnMouseDownYellowCatMouthButton() {
    }

    OnTouchStartBlackCatMouthButton() {
        this.isTouchStartBlackCatOpenMouth = true;
        this.blackCatOpenMouthElement.style.transform = "scale(0.75)";
        this.blackCatCloseMouthElement.style.opacity = "1";
        this.blackCatCloseMouthElement.style.transform = "scale(1,1)";
        this.blackCatRopeElement.style.animationPlayState = "paused";
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
    }

    OnTouchEndBlackCatMouthButton(e) {
        this.blackCatOpenMouthElement.style.transform = "scale(1)";
        this.blackCatCloseMouthElement.style.opacity = "0";
        this.blackCatCloseMouthElement.style.transform = "scale(1,0.8)";
        this.blackCatRopeElement.style.animationPlayState = "running";
        if (this.isTouchStartBlackCatOpenMouth == true) {
            TimerApp.Datas.currentState = StateType.Stop;
            TimerApp.Uis.CountdownUi.OpenOrCloseUi(false);
            TimerApp.Uis.TimingUi.OpenOrCloseUi(true);
            this.blackCatRopeElement.style.top = "-341px";
            this.blackCatRopeElement.style.animation = "";
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonUp);
        }
        this.isTouchStartBlackCatOpenMouth = false;
        e.preventDefault();
    }

    OnClickBlackCatMouthButton() {
    }

    OnMouseDownBlackCatMouthButton() {
    }
}

class OtherApp {
    static get SupportIosTool() {
        return this.supportIosTool;
    }

    static Start() {
        this.otherUi = new OtherUi();
        this.supportIosTool = new SupportIosTool();
        this.supportMobileTool = new SupportMobileTool();
        this.supportIosTool.SupportIos();
        let _bodyElement = document.querySelector("body");
        let _onTouchStartBody = this.supportMobileTool.SupportMobile.bind(this.supportMobileTool);
        _bodyElement.ontouchstart = _onTouchStartBody;
    }
}

var LanguageType;
(function (LanguageType) {
    LanguageType[LanguageType["None"] = 0] = "None";
    LanguageType[LanguageType["English"] = 1] = "English";
    LanguageType[LanguageType["Chinese"] = 2] = "Chinese";
})(LanguageType || (LanguageType = {}));
var StateType;
(function (StateType) {
    StateType[StateType["None"] = 0] = "None";
    StateType[StateType["Run"] = 1] = "Run";
    StateType[StateType["Pause"] = 2] = "Pause";
    StateType[StateType["Stop"] = 3] = "Stop";
})(StateType || (StateType = {}));
var AudioType;
(function (AudioType) {
    AudioType[AudioType["None"] = 0] = "None";
    AudioType[AudioType["Complete"] = 1] = "Complete";
    AudioType[AudioType["CatUp"] = 2] = "CatUp";
    AudioType[AudioType["CatDown"] = 3] = "CatDown";
    AudioType[AudioType["ButtonDown"] = 4] = "ButtonDown";
    AudioType[AudioType["ButtonUp"] = 5] = "ButtonUp";
    AudioType[AudioType["AddOrlessNumber"] = 6] = "AddOrlessNumber";
})(AudioType || (AudioType = {}));

class Tools {
    static StringToInt(_string) {
        let _isHaveDecimalPoint = false;
        let _numberString = "";
        for (let i = 0; i < _string.length; i++) {
            let _chat = window.parseInt(_string[i]);
            if (_chat === _chat) {
                _numberString += _chat;
            }
        }
        if (_numberString == "") {
            _numberString = "0";
        }
        let _number = window.parseInt(_numberString);
        return _number;
    }

    static StringToFloat(_string) {
        let _isHaveDecimalPoint = false;
        let _numberString = "0";
        for (let i = 0; i < _string.length; i++) {
            if (_string[i] == ".") {
                if (_isHaveDecimalPoint == false) {
                    _isHaveDecimalPoint = true;
                    _numberString += ".";
                }
            } else {
                let _chat = window.parseFloat(_string[i]);
                if (_chat === _chat) {
                    _numberString += _chat;
                }
            }
        }
        if (_numberString == "") {
            _numberString = "0";
        }
        let _number = window.parseFloat(_numberString);
        return _number;
    }

    static NumberToString(_number, _digits) {
        let _numberString = _number + "";
        let _string = "";
        for (let i = 0; i < _digits; i++) {
            if (i < _numberString.length) {
                _string = _string + _numberString[i];
            } else {
                _string = "0" + _string;
            }
        }
        return _string;
    }

    static ClampNumber(_number, _min, _max) {
        if (_number < _min) {
            _number = _min;
        } else if (_number > _max) {
            _number = _max;
        }
        return _number;
    }

    static RandomInt(_min, _max) {
        let _randomNumber = Math.random();
        _randomNumber = _randomNumber * (_max - _min) + _min;
        _randomNumber = Math.floor(_randomNumber);
        return _randomNumber;
    }
}

class Time {
    constructor(_minute = 0, _seconds = 0) {
        this.minute = _minute;
        this.seconds = _seconds;
    }

    AddOrRemoveMinute(_changeMinute) {
        let _newMinute = this.minute + _changeMinute;
        if (_newMinute < 0) {
            _newMinute = 99;
        } else if (_newMinute > 99) {
            _newMinute = 0;
        }
        this.minute = _newMinute;
    }

    AddOrRemoveSeconds(_changeSeconds) {
        let _newSeconds = this.seconds + _changeSeconds;
        if (_newSeconds < 0) {
            _newSeconds = 59;
        } else if (_newSeconds > 59) {
            _newSeconds = 0;
        }
        this.seconds = _newSeconds;
    }

    AddOrRemoveTime(_changeSeconds) {
        let _totalSeconds = this.minute * 60 + this.seconds;
        _totalSeconds = _totalSeconds + _changeSeconds;
        this.minute = Math.floor(_totalSeconds / 60);
        this.seconds = _totalSeconds - this.minute * 60;
    }

    ChangeMinute(_minute) {
        _minute = Tools.ClampNumber(_minute, 0, 99);
        this.minute = _minute;
    }

    ChangeSeconds(_seconds) {
        _seconds = Tools.ClampNumber(_seconds, 0, 59);
        this.seconds = _seconds;
    }

    TimeToSeconds() {
        let _totalSeconds = this.minute * 60 + this.seconds;
        return _totalSeconds;
    }

    MinuteToString() {
        let _minute = Tools.NumberToString(this.minute, 2);
        return _minute;
    }

    SecondsToString() {
        let _seconds = Tools.NumberToString(this.seconds, 2);
        return _seconds;
    }

    ToString() {
        let _minute = Tools.NumberToString(this.minute, 2);
        let _seconds = Tools.NumberToString(this.seconds, 2);
        return _minute + ":" + _seconds;
    }
}

class Datas {
    constructor() {
        this.currentState = StateType.None;
        this.volume = 100;
        this.language = LanguageType.English;
        this.currentTime = new Time(0, 0);
        this.inputTime = new Time(24, 0);
    }
}

class AudioSystem {
    constructor() {
        this.buttonDownAudio = document.querySelector("#audios .buttonDown");
        this.buttonUpAudio = document.querySelector("#audios .buttonUp");
        this.addOrLessNumberAudio = document.querySelector("#audios .addOrLessNumber");
        this.completeAudio = document.querySelector("#audios .complete");
        this.catUpAudios = new Array();
        this.catUpAudios.push(document.querySelector("#audios .catUp1"));
        this.catUpAudios.push(document.querySelector("#audios .catUp2"));
        this.catUpAudios.push(document.querySelector("#audios .catUp3"));
        this.catDownAudios = new Array();
        this.catDownAudios.push(document.querySelector("#audios .catDown1"));
        this.catDownAudios.push(document.querySelector("#audios .catDown2"));
        this.catDownAudios.push(document.querySelector("#audios .catDown3"));
    }

    PlayAudio(_audioType) {

        if (TimerApp.Datas.volume <= 0)
            return;
        //         if (OtherApp.SupportIosTool.IsIos == true) {
        //     OtherApp.SupportIosTool.PlayAudio(_audioType);
        //     return;
        // }
        switch (_audioType) {
            case AudioType.ButtonDown:
                this.buttonDownAudio.play();
                break;
            case AudioType.ButtonUp:
                this.buttonUpAudio.play();
                break;
            case AudioType.AddOrlessNumber:
                this.addOrLessNumberAudio.play();
                break;
            case AudioType.Complete:
                this.completeAudio.play();
                break;
            case AudioType.CatUp:
                let _catUpIndex = Tools.RandomInt(0, this.catUpAudios.length);
                this.catUpAudios[_catUpIndex].play();
                this.StopAudio(AudioType.CatUp, _catUpIndex);
                this.StopAudio(AudioType.CatDown);
                break;
            case AudioType.CatDown:
                let _catDownIndex = Tools.RandomInt(0, this.catDownAudios.length);
                this.catDownAudios[_catDownIndex].play();
                this.StopAudio(AudioType.CatUp);
                this.StopAudio(AudioType.CatDown, _catDownIndex);
                break;
        }
    }

    StopAudio(_audioType, _noStopIndex = -1) {
        switch (_audioType) {
            case AudioType.CatUp:
                for (let i = 0; i < this.catUpAudios.length; i++) {
                    if (_noStopIndex != i) {
                        this.catUpAudios[i].pause();
                        this.catUpAudios[i].currentTime = 0;
                    }
                }
                break;
            case AudioType.CatDown:
                for (let i = 0; i < this.catDownAudios.length; i++) {
                    if (_noStopIndex != i) {
                        this.catDownAudios[i].pause();
                        this.catDownAudios[i].currentTime = 0;
                    }
                }
                break;
            case AudioType.Complete:
                this.completeAudio.pause();
                this.completeAudio.currentTime = 0;
                break;
        }
    }

    UpdateVolume(_volume) {
        TimerApp.Datas.volume = _volume;
        _volume = _volume / 100;
        this.buttonDownAudio.volume = _volume;
        this.buttonUpAudio.volume = _volume;
        this.addOrLessNumberAudio.volume = _volume;
        this.completeAudio.volume = _volume;
        for (let i = 0; i < this.catUpAudios.length; i++) {
            this.catUpAudios[i].volume = _volume;
        }
        for (let i = 0; i < this.catDownAudios.length; i++) {
            this.catDownAudios[i].volume = _volume;
        }
    }
}

class TimeSystem {
    constructor() {
        let timerOnTick = this.TimerOnTick.bind(this);
        window.setInterval(timerOnTick, 1000);
    }

    TimerOnTick() {
        if (TimerApp.Datas.currentState != StateType.Run)
            return;
        if (TimerApp.Datas.currentTime.TimeToSeconds() <= 0) {
            TimerApp.Datas.currentState = StateType.Stop;
            TimerApp.Uis.CountdownUi.OpenOrCloseCompleteTip(true);
        } else {
            TimerApp.Datas.currentTime.AddOrRemoveTime(-1);

            TimerApp.Uis.CountdownUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());
            let _progress = TimerApp.Datas.currentTime.TimeToSeconds() / TimerApp.Datas.inputTime.TimeToSeconds();
            _progress = 100 - Math.floor(_progress * 100);
            _progress = Tools.ClampNumber(_progress, 0, 100);
            document.title = "Easy Cat Timer - [" + _progress + "%]";
        }
    }
}

class SaveSystem {
    Save() {
        let _localStorage = window.localStorage;
        _localStorage.setItem("volume", TimerApp.Datas.volume + "");
    }

    Load() {
        let _localStorage = window.localStorage;
        let _volume = _localStorage.getItem("volume");
        if (_volume != null) {
            TimerApp.Datas.volume = window.parseInt(_volume);
        }
        TimerApp.Uis.SettingUi.UpdateVolume(TimerApp.Datas.volume);
        TimerApp.Systems.AudioSystem.UpdateVolume(TimerApp.Datas.volume);
    }
}

class Systems {
    constructor() {
        this.audioSystem = new AudioSystem();
        this.timeSystem = new TimeSystem();
        this.saveSystem = new SaveSystem();
    }

    get AudioSystem() {
        return this.audioSystem;
    }

    get TimeSystem() {
        return this.timeSystem;
    }

    get SaveSystem() {
        return this.saveSystem;
    }
}

class TitleBarUi {
    constructor() {
        this.uiElement = document.querySelector("#titleBarUi");
        this.settingToggleElement = document.querySelector("#titleBarUi .settingToggle");
        this.closeButtonElement = document.querySelector("#titleBarUi .closeButton");
        let onMouseDownButton = this.OnMouseDownButton.bind(this);
        let onClickSettingToggle = this.OnClickSettingToggle.bind(this);
        let onClickCloseButton = this.OnClickCloseButton.bind(this);
        let onContextMenuUi = this.OnContextMenuUi.bind(this);
        this.settingToggleElement.onclick = onClickSettingToggle;
        this.closeButtonElement.onclick = onClickCloseButton;
        this.settingToggleElement.onmousedown = onMouseDownButton;
        this.closeButtonElement.onmousedown = onMouseDownButton;
        this.uiElement.oncontextmenu = onContextMenuUi;
    }

    get SettingToggleElement() {
        return this.settingToggleElement;
    }

    OnClickSettingToggle() {
        if (TimerApp.Uis.SettingUi.IsShowUi == false) {
            TimerApp.Uis.SettingUi.OpenOrCloseUi(true);
        } else {
            TimerApp.Uis.SettingUi.OpenOrCloseUi(false);
        }
    }

    //todo 点击了关闭按钮后
    OnClickCloseButton() {
        window.electronAPI.closeAPP("close-app")
    }

    OnMouseDownButton() {
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
    }

    OnContextMenuUi() {
        window.event.returnValue = false;
        return false;
    }
}

class CountdownUi {
    constructor() {
        this.isOpenCompleteTip = false;
        this.isShowTimeIsUpPanel = false;
        this.showTimeIsUpPanelIntervalId = -1;
        this.showTimeIsUpPanelTimeoutId = -1;
        this.uiElement = document.querySelector("#countdownUi");
        this.blackCatPanelElement = document.querySelector("#countdownUi .blackCat .cat");
        this.blackCatRopeElement = document.querySelector("#countdownUi .blackCat .rope");
        this.blackCatOpenMouthElement = document.querySelector("#countdownUi .blackCat .cat .mouth");
        this.blackCatCloseMouthElement = document.querySelector("#countdownUi .blackCat .cat .close");
        this.yellowCatPanelElement = document.querySelector("#countdownUi .yellowCat .cat");
        this.yellowCatRopeElement = document.querySelector("#countdownUi .yellowCat .rope");
        this.yellowCatOpenMouthElement = document.querySelector("#countdownUi .yellowCat .cat .mouth");
        this.yellowCatCloseMouthElement = document.querySelector("#countdownUi .yellowCat .cat .close");
        this.yellowCatPauseTextElement = document.querySelector("#countdownUi .yellowCat .rope .text .pause");
        this.yellowCatResumeTextElement = document.querySelector("#countdownUi .yellowCat .rope .text .resume");
        this.timeTextElement = document.querySelector("#countdownUi .time .timeText");
        this.pausedPanelElement = document.querySelector("#countdownUi .paused");
        this.pausedTimeTextElement = document.querySelector("#countdownUi .paused .timeText");
        this.timeIsUpPanelElement = document.querySelector("#countdownUi .timeIsUp");
        let onMouseEnterBlackCatPanel = this.OnMouseEnterBlackCatPanel.bind(this);
        let onMouseLeaveBlackCatPanel = this.OnMouseLeaveBlackCatPanel.bind(this);
        let onMouseDownBlackCatMouthButton = this.OnMouseDownBlackCatMouthButton.bind(this);
        let onMouseUpBlackCatPanel = this.OnMouseUpBlackCatPanel.bind(this);
        let onClickBlackCatMouthButton = this.OnClickBlackCatMouthButton.bind(this);
        let onMouseEnterYellowCatPanel = this.OnMouseEnterYellowCatPanel.bind(this);
        let onMouseLeaveYellowCatPanel = this.OnMouseLeaveYellowCatPanel.bind(this);
        let onMouseDownYellowCatMouthButton = this.OnMouseDownYellowCatMouthButton.bind(this);
        let onClickYellowCatMouthButton = this.OnClickYellowCatMouthButton.bind(this);
        let onMouseUpYellowCatPanel = this.OnMouseUpYellowCatPanel.bind(this);
        let onContextMenuUi = this.OnContextMenuUi.bind(this);
        let onMouseDownBody = this.OnMouseDownBody.bind(this);
        let onDragStartUi = this.OnDragStartUi.bind(this);
        this.blackCatPanelElement.onmouseenter = onMouseEnterBlackCatPanel;
        this.blackCatPanelElement.onmouseleave = onMouseLeaveBlackCatPanel;
        this.blackCatPanelElement.onmouseup = onMouseUpBlackCatPanel;
        this.blackCatOpenMouthElement.onmousedown = onMouseDownBlackCatMouthButton;
        this.blackCatOpenMouthElement.onclick = onClickBlackCatMouthButton;
        this.yellowCatPanelElement.onmouseenter = onMouseEnterYellowCatPanel;
        this.yellowCatPanelElement.onmouseleave = onMouseLeaveYellowCatPanel;
        this.yellowCatPanelElement.onmouseup = onMouseUpYellowCatPanel;
        this.yellowCatOpenMouthElement.onmousedown = onMouseDownYellowCatMouthButton;
        this.yellowCatOpenMouthElement.onclick = onClickYellowCatMouthButton;
        this.uiElement.oncontextmenu = onContextMenuUi;
        this.uiElement.ondragstart = onDragStartUi;
        this.uiElement.parentElement.parentElement.onmousedown = onMouseDownBody;
    }

    get UiElement() {
        return this.uiElement;
    }

    OpenOrCloseUi(_isOpen) {
        if (_isOpen == true) {
            this.UiElement.style.display = "block";
        } else {
            this.pausedPanelElement.style.visibility = "hidden";
            this.yellowCatPauseTextElement.style.opacity = "1";
            this.yellowCatResumeTextElement.style.opacity = "0";
            this.OpenOrCloseCompleteTip(false);
            this.UiElement.style.display = "none";
        }
    }

    UpdateTimeText(_time) {
        this.timeTextElement.innerText = _time;
    }

    //todo 打开或者关闭完成提示
    OpenOrCloseCompleteTip(_isOpen) {
        if (_isOpen == true) {
            this.isOpenCompleteTip = true;
            // TimerApp.Systems.AudioSystem.PlayAudio(AudioType.Complete);
            this.isShowTimeIsUpPanel = true;
            this.timeIsUpPanelElement.style.opacity = "1";
            this.showTimeIsUpPanelIntervalId = window.setInterval(() => {
                if (this.isShowTimeIsUpPanel == false) {
                    this.isShowTimeIsUpPanel = true;
                    this.timeIsUpPanelElement.style.opacity = "1";
                } else {
                    this.isShowTimeIsUpPanel = false;
                    this.timeIsUpPanelElement.style.opacity = "0";
                }
                TimerApp.Systems.AudioSystem.PlayAudio(AudioType.Complete);
            }, 830);
            // this.showTimeIsUpPanelTimeoutId = window.setTimeout(() => {
            //     this.OpenOrCloseCompleteTip(false);
            //     this.showTimeIsUpPanelTimeoutId = -1;
            // }, 11000);
            window.electronAPI.CompleteTip()
        } else {
            this.isOpenCompleteTip = false;
            TimerApp.Systems.AudioSystem.StopAudio(AudioType.Complete);
            document.title = "Easy Cat Timer";
            if (this.showTimeIsUpPanelIntervalId != -1) {
                window.clearTimeout(this.showTimeIsUpPanelTimeoutId);
                this.showTimeIsUpPanelTimeoutId = -1;
                window.clearInterval(this.showTimeIsUpPanelIntervalId);
                this.isShowTimeIsUpPanel = false;
                this.timeIsUpPanelElement.style.opacity = "0";
            }
        }
    }

    OnMouseEnterBlackCatPanel() {
        this.blackCatRopeElement.style.top = "-40px";
        this.blackCatRopeElement.style.animation = "blackCatRopeSwingAnimation 2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate backwards";
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.CatUp);
        // this.OnMouseDownBody();
    }

    OnMouseLeaveBlackCatPanel() {
        this.blackCatRopeElement.style.top = "-341px";
        this.blackCatRopeElement.style.animation = "";
        if (this.uiElement.style.display != "none") {
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.CatDown);
        }
        this.OnMouseUpBlackCatPanel();
    }

    OnMouseUpBlackCatPanel() {
        this.blackCatOpenMouthElement.style.transform = "scale(1)";
        this.blackCatCloseMouthElement.style.opacity = "0";
        this.blackCatCloseMouthElement.style.transform = "scale(1,0.8)";
        this.blackCatRopeElement.style.animationPlayState = "running";
    }

    OnMouseDownBlackCatMouthButton(e) {
        if (e.button == 0) {
            this.blackCatOpenMouthElement.style.transform = "scale(0.75)";
            this.blackCatCloseMouthElement.style.opacity = "1";
            this.blackCatCloseMouthElement.style.transform = "scale(1,1)";
            this.blackCatRopeElement.style.animationPlayState = "paused";
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        }
    }

    OnClickBlackCatMouthButton() {
        TimerApp.Datas.currentState = StateType.Stop;
        TimerApp.Uis.CountdownUi.OpenOrCloseUi(false);
        TimerApp.Uis.TimingUi.OpenOrCloseUi(true);
        this.blackCatRopeElement.style.top = "-341px";
        this.blackCatRopeElement.style.animation = "";
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonUp);
    }

    OnMouseEnterYellowCatPanel() {
        this.yellowCatRopeElement.style.top = "-30px";
        this.yellowCatRopeElement.style.animation = "yellowCatRopeSwingAnimation 2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate backwards";
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.CatUp);
        // this.OnMouseDownBody();
    }

    OnMouseLeaveYellowCatPanel() {
        this.yellowCatRopeElement.style.top = "-369px";
        this.yellowCatRopeElement.style.animation = "";
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.CatDown);
        this.OnMouseUpYellowCatPanel();
    }

    OnMouseUpYellowCatPanel() {
        this.yellowCatOpenMouthElement.style.transform = "scale(1)";
        this.yellowCatCloseMouthElement.style.opacity = "0";
        this.yellowCatCloseMouthElement.style.transform = "scale(1,0.8)";
        this.yellowCatRopeElement.style.animationPlayState = "running";
    }

    OnMouseDownYellowCatMouthButton(e) {
        if (e.button == 0) {
            this.yellowCatOpenMouthElement.style.transform = "scale(0.75)";
            this.yellowCatCloseMouthElement.style.opacity = "1";
            this.yellowCatCloseMouthElement.style.transform = "scale(1,1)";
            this.yellowCatRopeElement.style.animationPlayState = "paused";
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        }
    }

    OnClickYellowCatMouthButton() {
        if (this.pausedPanelElement.style.visibility != "visible") {
            if (TimerApp.Datas.currentState == StateType.Run) {
                TimerApp.Datas.currentState = StateType.Pause;
            }
            this.yellowCatPauseTextElement.style.opacity = "0";
            this.yellowCatResumeTextElement.style.opacity = "1";
            this.pausedTimeTextElement.innerText = TimerApp.Datas.currentTime.ToString();
            this.pausedPanelElement.style.visibility = "visible";
        } else {
            if (TimerApp.Datas.currentState == StateType.Pause) {
                TimerApp.Datas.currentState = StateType.Run;
            }
            this.yellowCatPauseTextElement.style.opacity = "1";
            this.yellowCatResumeTextElement.style.opacity = "0";
            this.pausedPanelElement.style.visibility = "hidden";
        }
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonUp);
    }

    OnContextMenuUi() {
        window.event.returnValue = false;
        return false;
    }
    //todo 此处关闭到时间的提示
    OnMouseDownBody() {
        if (this.isOpenCompleteTip == true) {
            this.OpenOrCloseCompleteTip(false);
        }
    }

    OnDragStartUi() {
        return false;
    }
}

class TimingUi {
    constructor() {
        this.minuteAddButtonIntervalId = -1;
        this.minuteLessButtonIntervalId = -1;
        this.secondsAddButtonIntervalId = -1;
        this.secondsLessButtonIntervalId = -1;
        this.isOpenChangeMinuteInput = false;
        this.isOpenChangeSecondsInput = false;
        this.uiElement = document.querySelector("#timingUi");
        this.minuteAddButtonElement = document.querySelector("#timingUi .minuteButtons .addButton");
        this.minuteLessButtonElement = document.querySelector("#timingUi .minuteButtons .lessButton");
        this.minuteNumberButtonElement = document.querySelector("#timingUi .minuteButtons .numberButton");
        this.secondsAddButtonElement = document.querySelector("#timingUi .secondsButtons .addButton");
        this.secondsLessButtonElement = document.querySelector("#timingUi .secondsButtons .lessButton");
        this.secondsNumberButtonElement = document.querySelector("#timingUi .secondsButtons .numberButton");
        this.minuteTextElement = document.querySelector("#timingUi .clock .minuteText");
        this.secondsTextElement = document.querySelector("#timingUi .clock .secondsText");
        this.changeMinutePanelElement = document.querySelector("#timingUi .changeClockInput .minute");
        this.changeSecondsPanelElement = document.querySelector("#timingUi .changeClockInput .seconds");
        this.changeMinuteInputElement = document.querySelector("#timingUi .changeClockInput .minute .input");
        this.changeSecondsInputElement = document.querySelector("#timingUi .changeClockInput .seconds .input");
        this.closeInputsButtonElement = document.querySelector("#timingUi .changeClockInput .closeButton");
        this.yellowBackgroundElement = document.querySelector("#timingUi .background .yellow");
        this.grayBackgroundElement = document.querySelector("#timingUi .background .gray");
        this.startButtonElement = document.querySelector("#timingUi .start .button");
        this.startLineElement = document.querySelector("#timingUi .start .line");
        let onMouseDownButton = this.OnMouseDownButton.bind(this);
        let onMouseDownMinuteAddButton = this.OnMouseDownMinuteAddButton.bind(this);
        let onMouseDownMinuteLessButton = this.OnMouseDownMinuteLessButton.bind(this);
        let onMouseDownSecondsAddButton = this.OnMouseDownSecondsAddButton.bind(this);
        let onMouseDownSecondsLessButton = this.OnMouseDownSecondsLessButton.bind(this);
        let onMouseUpUi = this.OnMouseUpUi.bind(this);
        let onContextMenuUi = this.OnContextMenuUi.bind(this);
        let onKeyPressUi = this.OnKeyPressUi.bind(this);
        let onClickMinuteNumberButton = this.OnClickMinuteNumberButton.bind(this);
        let onClickSecondsNumberButton = this.OnClickSecondsNumberButton.bind(this);
        let onClickCloseInputsButton = this.OnClickCloseInputsButton.bind(this);
        let onClickStartButton = this.OnClickStartButton.bind(this);
        let onDragStartUi = this.OnDragStartUi.bind(this);
        this.minuteAddButtonElement.onmousedown = onMouseDownMinuteAddButton;
        this.minuteLessButtonElement.onmousedown = onMouseDownMinuteLessButton;
        this.secondsAddButtonElement.onmousedown = onMouseDownSecondsAddButton;
        this.secondsLessButtonElement.onmousedown = onMouseDownSecondsLessButton;
        this.uiElement.onmouseup = onMouseUpUi;
        this.uiElement.onmouseleave = onMouseUpUi;
        this.uiElement.oncontextmenu = onContextMenuUi;
        this.uiElement.onkeypress = onKeyPressUi;
        this.uiElement.ondragstart = onDragStartUi;
        this.minuteNumberButtonElement.onmousedown = onMouseDownButton;
        this.minuteNumberButtonElement.onclick = onClickMinuteNumberButton;
        this.secondsNumberButtonElement.onmousedown = onMouseDownButton;
        this.secondsNumberButtonElement.onclick = onClickSecondsNumberButton;
        this.closeInputsButtonElement.onmousedown = onMouseDownButton;
        this.closeInputsButtonElement.onclick = onClickCloseInputsButton;
        this.startButtonElement.onmousedown = onMouseDownButton;
        this.startButtonElement.onclick = onClickStartButton;
    }

    get UiElement() {
        return this.uiElement;
    }

    OpenOrCloseUi(_isOpen) {
        if (_isOpen == true) {
            this.UiElement.style.display = "block";
        } else {
            this.UiElement.style.display = "none";
        }
    }

    OnMouseDownButton() {
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
    }

    OnMouseDownMinuteAddButton(e) {
        if (e.button != 0)
            return;
        TimerApp.Datas.inputTime.AddOrRemoveMinute(1);
        this.minuteTextElement.innerText = TimerApp.Datas.inputTime.MinuteToString();
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        let _startTime = 0.6;
        this.minuteAddButtonIntervalId = window.setInterval(() => {
            if (_startTime > 0) {
                _startTime -= 0.2;
                return;
            }
            TimerApp.Datas.inputTime.AddOrRemoveMinute(1);
            this.minuteTextElement.innerText = TimerApp.Datas.inputTime.MinuteToString();
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.AddOrlessNumber);
        }, 200);
    }

    OnMouseDownMinuteLessButton(e) {
        if (e.button != 0)
            return;
        TimerApp.Datas.inputTime.AddOrRemoveMinute(-1);
        this.minuteTextElement.innerText = TimerApp.Datas.inputTime.MinuteToString();
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        let _startTime = 0.6;
        this.minuteLessButtonIntervalId = window.setInterval(() => {
            if (_startTime > 0) {
                _startTime -= 0.2;
                return;
            }
            TimerApp.Datas.inputTime.AddOrRemoveMinute(-1);
            this.minuteTextElement.innerText = TimerApp.Datas.inputTime.MinuteToString();
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.AddOrlessNumber);
        }, 200);
    }

    OnMouseDownSecondsAddButton(e) {
        if (e.button != 0)
            return;
        TimerApp.Datas.inputTime.AddOrRemoveSeconds(1);
        this.secondsTextElement.innerText = TimerApp.Datas.inputTime.SecondsToString();
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        let _startTime = 0.6;
        this.secondsAddButtonIntervalId = window.setInterval(() => {
            if (_startTime > 0) {
                _startTime -= 0.2;
                return;
            }
            TimerApp.Datas.inputTime.AddOrRemoveSeconds(1);
            this.secondsTextElement.innerText = TimerApp.Datas.inputTime.SecondsToString();
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.AddOrlessNumber);
        }, 200);
    }

    OnMouseDownSecondsLessButton(e) {
        if (e.button != 0)
            return;
        TimerApp.Datas.inputTime.AddOrRemoveSeconds(-1);
        this.secondsTextElement.innerText = TimerApp.Datas.inputTime.SecondsToString();
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        let _startTime = 0.6;
        this.secondsLessButtonIntervalId = window.setInterval(() => {
            if (_startTime > 0) {
                _startTime -= 0.2;
                return;
            }
            TimerApp.Datas.inputTime.AddOrRemoveSeconds(-1);
            this.secondsTextElement.innerText = TimerApp.Datas.inputTime.SecondsToString();
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.AddOrlessNumber);
        }, 200);
    }

    OnMouseUpUi() {
        if (this.minuteAddButtonIntervalId != -1) {
            window.clearInterval(this.minuteAddButtonIntervalId);
            this.minuteAddButtonIntervalId = -1;
        }
        if (this.minuteLessButtonIntervalId != -1) {
            window.clearInterval(this.minuteLessButtonIntervalId);
            this.minuteLessButtonIntervalId = -1;
        }
        if (this.secondsAddButtonIntervalId != -1) {
            window.clearInterval(this.secondsAddButtonIntervalId);
            this.secondsAddButtonIntervalId = -1;
        }
        if (this.secondsLessButtonIntervalId != -1) {
            window.clearInterval(this.secondsLessButtonIntervalId);
            this.secondsLessButtonIntervalId = -1;
        }
    }

    OnContextMenuUi() {
        window.event.returnValue = false;
        return false;
    }

    OnKeyPressUi(e) {
        if (e.keyCode == 13) {
            this.OnClickCloseInputsButton();
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
        }
    }

    OnClickMinuteNumberButton() {
        this.isOpenChangeMinuteInput = true;
        this.changeMinuteInputElement.value = TimerApp.Datas.inputTime.MinuteToString();
        this.yellowBackgroundElement.style.opacity = "0";
        this.changeMinutePanelElement.style.visibility = "visible";
        this.closeInputsButtonElement.style.visibility = "visible";
        this.changeMinuteInputElement.focus();
    }

    OnClickSecondsNumberButton() {
        this.isOpenChangeSecondsInput = true;
        this.changeSecondsInputElement.value = TimerApp.Datas.inputTime.SecondsToString();
        this.grayBackgroundElement.style.opacity = "0";
        this.changeSecondsPanelElement.style.visibility = "visible";
        this.closeInputsButtonElement.style.visibility = "visible";
        this.changeSecondsInputElement.focus();
    }

    OnClickCloseInputsButton() {
        if (this.isOpenChangeMinuteInput == true) {
            let _inputString = this.changeMinuteInputElement.value;
            let _inputNumber = Tools.StringToInt(_inputString);
            TimerApp.Datas.inputTime.ChangeMinute(_inputNumber);
            this.minuteTextElement.innerText = TimerApp.Datas.inputTime.MinuteToString();
        }
        if (this.isOpenChangeSecondsInput == true) {
            let _inputString = this.changeSecondsInputElement.value;
            let _inputNumber = Tools.StringToInt(_inputString);
            TimerApp.Datas.inputTime.ChangeSeconds(_inputNumber);
            this.secondsTextElement.innerText = TimerApp.Datas.inputTime.SecondsToString();
        }
        this.isOpenChangeMinuteInput = false;
        this.isOpenChangeSecondsInput = false;
        this.yellowBackgroundElement.style.opacity = "1";
        this.grayBackgroundElement.style.opacity = "1";
        this.changeMinutePanelElement.style.visibility = "hidden";
        this.changeSecondsPanelElement.style.visibility = "hidden";
        this.closeInputsButtonElement.style.visibility = "hidden";
    }

    OnClickStartButton() {
        TimerApp.Datas.currentTime.ChangeMinute(TimerApp.Datas.inputTime.minute);
        TimerApp.Datas.currentTime.ChangeSeconds(TimerApp.Datas.inputTime.seconds);
        TimerApp.Uis.CountdownUi.UpdateTimeText(TimerApp.Datas.currentTime.ToString());
        TimerApp.Datas.currentState = StateType.Run;
        TimerApp.Uis.TimingUi.OpenOrCloseUi(false);
        TimerApp.Uis.CountdownUi.OpenOrCloseUi(true);
    }

    OnDragStartUi() {
        return false;
    }
}

class SettingUi {
    constructor() {
        this.isShowUi = false;
        this.isShowChooseLanguagePanel = false;
        this.isDragVolumeSliderRound = false;
        this.uiElement = document.querySelector("#settingUi");
        this.closeButtonElement = document.querySelector("#settingUi .closeButton");
        this.currentLanguageButtonElement = document.querySelector("#settingUi .language .currentLanguage");
        this.chooseLanguagePanelElement = document.querySelector("#settingUi .language .chooseLanguage");
        this.englishButtonElement = document.querySelector("#settingUi .language .chooseLanguage .english");
        this.chineseButtonElement = document.querySelector("#settingUi .language .chooseLanguage .chinese");
        this.staffPanelElement = document.querySelector("#settingUi .staffPanel");
        this.staffButtonElement = document.querySelector("#settingUi .staffButton");
        this.githubButtonElement = document.querySelector("#settingUi .githubButton");
        this.volumeSliderPanelElement = document.querySelector("#settingUi .volumeSlider");
        this.volumeSliderRoundElement = document.querySelector("#settingUi .volumeSlider .round");
        this.volumeNumberPanelElement = document.querySelector("#settingUi .volumeNumber");
        this.volumeNumberTextElement = document.querySelector("#settingUi .volumeNumber .number");
        this.inputVolumeSliderElement = document.querySelector("#settingUi .inputVolumeSlider .input");
        let onMouseDownButton = this.OnMouseDownButton.bind(this);
        let onClickCloseButton = this.OnClickCloseButton.bind(this);
        // let onClickCurrentLanguageButton = this.OnClickCurrentLanguageButton.bind(this);
        let onClickEnglishButton = this.OnClickEnglishButton.bind(this);
        let onClickChineseButton = this.OnClickChineseButton.bind(this);
        let onMouseEnterStaffButton = this.OnMouseEnterStaffButton.bind(this);
        let onMouseLeaveStaffButton = this.OnMouseLeaveStaffButton.bind(this);
        let onMouseEnterVolumeSliderPanel = this.OnMouseEnterVolumeSliderPanel.bind(this);
        let onMouseLeaveVolumeSliderPanel = this.OnMouseLeaveVolumeSliderPanel.bind(this);
        let onMouseDownVolumeSliderRound = this.OnMouseDownVolumeSliderRound.bind(this);
        let onMouseMoveVolumeSliderRound = this.OnMouseMoveVolumeSliderRound.bind(this);
        let onMouseUpVolumeSliderRound = this.OnMouseUpVolumeSliderRound.bind(this);
        let onContextMenuUi = this.OnContextMenuUi.bind(this);
        let onDragStartUi = this.OnDragStartUi.bind(this);
        this.closeButtonElement.onclick = onClickCloseButton;
        // this.currentLanguageButtonElement.onclick = onClickCurrentLanguageButton;
        this.englishButtonElement.onclick = onClickEnglishButton;
        this.chineseButtonElement.onclick = onClickChineseButton;
        this.staffButtonElement.onmouseenter = onMouseEnterStaffButton;
        this.staffButtonElement.onmouseleave = onMouseLeaveStaffButton;
        this.volumeSliderPanelElement.onmouseenter = onMouseEnterVolumeSliderPanel;
        this.volumeSliderPanelElement.onmouseleave = onMouseLeaveVolumeSliderPanel;
        this.volumeSliderRoundElement.onmousedown = onMouseDownVolumeSliderRound;
        this.uiElement.onmousemove = onMouseMoveVolumeSliderRound;
        this.uiElement.onmouseup = onMouseUpVolumeSliderRound;
        this.uiElement.onmouseleave = onMouseUpVolumeSliderRound;
        this.currentLanguageButtonElement.onmousedown = onMouseDownButton;
        this.englishButtonElement.onmousedown = onMouseDownButton;
        this.chineseButtonElement.onmousedown = onMouseDownButton;
        this.closeButtonElement.onmousedown = onMouseDownButton;
        this.staffButtonElement.onmousedown = onMouseDownButton;
        this.githubButtonElement.onmousedown = onMouseDownButton;
        this.uiElement.oncontextmenu = onContextMenuUi;
        this.uiElement.ondragstart = onDragStartUi;
        //打开GitHub
        document.getElementById("github-button").onclick = () => {window.electronAPI.openUrlInDefaultBrowser("https://github.com/caiguang/CatTimer")}
        document.getElementById("caiguang").onclick = () => {window.electronAPI.openUrlInDefaultBrowser("https://space.bilibili.com/628189581")}
        document.getElementById("xudawang").onclick = () => {
            TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
            window.electronAPI.openUrlInDefaultBrowser("https://space.bilibili.com/222417")
        }
    }

    get IsShowUi() {
        return this.isShowUi;
    }

    get UiElement() {
        return this.uiElement;
    }

    OpenOrCloseUi(_isOpen) {
        if (_isOpen == true) {
            this.isShowUi = true;
            TimerApp.Uis.TitleBarUi.SettingToggleElement.style.backgroundColor = "#e3e3e3";
            this.UiElement.style.display = "block";
            this.uiElement.parentElement.style.overflow = "visible";
        } else {
            this.isShowUi = false;
            this.OpenOrCloseChooseLanguagePanel(false);
            TimerApp.Uis.TitleBarUi.SettingToggleElement.style.backgroundColor = "transparent";
            this.UiElement.style.display = "none";
            this.uiElement.parentElement.style.overflow = "hidden";
        }
    }

    UpdateVolume(_volume) {
        this.volumeSliderRoundElement.style.left = _volume / 10 * 9 + 4 + "px";
        this.inputVolumeSliderElement.value = _volume + "";
        this.volumeNumberTextElement.innerText = _volume + "";
    }

    OpenOrCloseChooseLanguagePanel(_isOpen) {
        if (_isOpen == true) {
            this.isShowChooseLanguagePanel = true;
            this.currentLanguageButtonElement.style.backgroundColor = "#e3e3e3";
            this.chooseLanguagePanelElement.style.visibility = "visible";
        } else {
            this.isShowChooseLanguagePanel = false;
            this.currentLanguageButtonElement.style.backgroundColor = "transparent";
            this.chooseLanguagePanelElement.style.visibility = "hidden";
        }
    }

    OnMouseDownButton() {
        TimerApp.Systems.AudioSystem.PlayAudio(AudioType.ButtonDown);
    }

    OnClickCloseButton() {
        this.OpenOrCloseUi(false);
    }

    //     OnClickCurrentLanguageButton() {
    //             if (this.isShowChooseLanguagePanel == false) {
    //                     this.OpenOrCloseChooseLanguagePanel(true);
    //     }
    //             else {
    //                     this.OpenOrCloseChooseLanguagePanel(false);
    //     }
    // }
    OnClickEnglishButton() {
        this.OpenOrCloseChooseLanguagePanel(false);
    }

    OnClickChineseButton() {
        this.OpenOrCloseChooseLanguagePanel(false);
    }

    OnMouseEnterStaffButton() {
        this.staffPanelElement.style.opacity = "1";
    }

    OnMouseLeaveStaffButton() {
        this.staffPanelElement.style.opacity = "0";
    }

    OnMouseEnterVolumeSliderPanel() {
        this.volumeNumberPanelElement.style.opacity = "1";
    }

    OnMouseLeaveVolumeSliderPanel() {
        this.volumeNumberPanelElement.style.opacity = "0";
    }

    OnMouseDownVolumeSliderRound(e) {
        if (e.button == 0) {
            this.isDragVolumeSliderRound = true;
        }
    }

    OnMouseMoveVolumeSliderRound(e) {
        if (this.isDragVolumeSliderRound == true) {
            if (e.clientX <= 0)
                return;
            let _mouseX = e.clientX;
            let _volumeSliderPanelX = this.volumeSliderPanelElement.offsetLeft + this.uiElement.parentElement.offsetLeft + this.uiElement.parentElement.parentElement.offsetLeft;
            let _offsetX = _mouseX - _volumeSliderPanelX;
            let _value = Math.floor((_offsetX - 4) / 9) * 10;
            if (_value > 100) {
                _value = 100;
            } else if (_value < 0) {
                _value = 0;
            }
            if (TimerApp.Datas.volume == _value)
                return;
            TimerApp.Datas.volume = _value;
            this.UpdateVolume(_value);
        }
    }

    OnMouseUpVolumeSliderRound(e) {
        if (this.isDragVolumeSliderRound == true) {
            this.isDragVolumeSliderRound = false;
            TimerApp.Systems.AudioSystem.UpdateVolume(TimerApp.Datas.volume);
            TimerApp.Systems.SaveSystem.Save();
        }
    }

    OnContextMenuUi() {
        window.event.returnValue = false;
        return false;
    }

    OnDragStartUi() {
        return false;
    }
}

class Uis {
    constructor() {
        this.titleBarUi = new TitleBarUi();
        this.countdownUi = new CountdownUi();
        this.timingUi = new TimingUi();
        this.settingUi = new SettingUi();
    }

    get TitleBarUi() {
        return this.titleBarUi;
    }

    get CountdownUi() {
        return this.countdownUi;
    }

    get TimingUi() {
        return this.timingUi;
    }

    get SettingUi() {
        return this.settingUi;
    }
}

class TimerApp {
    static get Datas() {
        return this.datas;
    }

    static get Systems() {
        return this.systems;
    }

    static get Uis() {
        return this.uis;
    }

    static Start() {
        this.datas = new Datas();
        this.systems = new Systems();
        this.uis = new Uis();
        this.systems.SaveSystem.Load();
    }
}

TimerApp.Start();
OtherApp.Start();
