class RaceTrack {
    raceTemplate() {
      this.straight();
      this.curve();
      this.chicane();
    }
  
    straight() {
      console.log("Car racing on a straight section.");
    }
  
    curve() {
      console.log("Car navigating a curve section.");
    }
  
    chicane() {
      console.log("Car maneuvering through a chicane section.");
    }
  }
  
  // Track 1
  class Track1 extends RaceTrack {
    straight() {
      console.log("Car racing on a straight section of Track 1.");
    }
  
    curve() {
      console.log("Car navigating a curve section of Track 1.");
    }
  
    chicane() {
      console.log("Car maneuvering through a chicane section of Track 1.");
    }
  }
  
  // Track 2
  class Track2 extends RaceTrack {
    straight() {
      console.log("Car racing on a straight section of Track 2.");
    }
  
    curve() {
      console.log("Car navigating a curve section of Track 2.");
    }
  
    chicane() {
      console.log("Car maneuvering through a chicane section of Track 2.");
    }
  }
  
  // Test
  const track1 = new Track1();
  const track2 = new Track2();
  
  console.log("Track 1:");
  track1.raceTemplate();
  
  console.log("\nTrack 2:");
  track2.raceTemplate();
  