class TV {
    constructor() {
      this.isOn = false;
      this.channel = 0;
      this.volume = 0;
    }
  
    powerOn() {
      this.isOn = true;
      console.log('TV is ON');
    }
  
    powerOff() {
      this.isOn = false;
      console.log('TV is OFF');
    }
  
    changeChannel(channel) {
      this.channel = channel;
      console.log(`Changed to channel ${channel}`);
    }
  
    adjustVolume(volume) {
      this.volume = volume;
      console.log(`Volume adjusted to ${volume}`);
    }
  }
  
  class Command {
    constructor(tv) {
      this.tv = tv;
      this.execute = function() {};
      this.undo = function() {};
    }
  }
  
  class PowerOnCommand extends Command {
    constructor(tv) {
      super(tv);
      this.execute = function() {
        this.tv.powerOn();
      };
      this.undo = function() {
        this.tv.powerOff();
      };
    }
  }
  
  class PowerOffCommand extends Command {
    constructor(tv) {
      super(tv);
      this.execute = function() {
        this.tv.powerOff();
      };
      this.undo = function() {
        this.tv.powerOn();
      };
    }
  }
  
  class ChangeChannelCommand extends Command {
    constructor(tv, channel) {
      super(tv);
      this.channel = channel;
      this.previousChannel = 0;
      this.execute = function() {
        this.previousChannel = this.tv.channel;
        this.tv.changeChannel(this.channel);
      };
      this.undo = function() {
        this.tv.changeChannel(this.previousChannel);
      };
    }
  }
  
  class AdjustVolumeCommand extends Command {
    constructor(tv, volume) {
      super(tv);
      this.volume = volume;
      this.previousVolume = 0;
      this.execute = function() {
        this.previousVolume = this.tv.volume;
        this.tv.adjustVolume(this.volume);
      };
      this.undo = function() {
        this.tv.adjustVolume(this.previousVolume);
      };
    }
  }
  
  // Testing the Command Pattern
  const tv = new TV();
  const powerOnCommand = new PowerOnCommand(tv);
  const powerOffCommand = new PowerOffCommand(tv);
  const changeChannelCommand = new ChangeChannelCommand(tv, 5);
  const adjustVolumeCommand = new AdjustVolumeCommand(tv, 20);
  
  powerOnCommand.execute();
  changeChannelCommand.execute();
  adjustVolumeCommand.execute();
  adjustVolumeCommand.undo();
  powerOffCommand.execute();
  