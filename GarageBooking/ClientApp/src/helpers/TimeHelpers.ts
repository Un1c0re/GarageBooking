export default {
  incrementTime: (time: string) => {
    const splitTime = time.split(":");
    const hours = splitTime[0];
    const minutes = splitTime[1];

    if (minutes.endsWith("30")) {
      return (Number(hours) + 1).toFixed(1).toString() + ":" + "00";
    }

    return Number(hours) + ":" + "30";
  },

  decrementTime: (time: string) => {
    const splitTime = time.split(":");
    const hours = splitTime[0];
    const minutes = splitTime[1];

    if (minutes.endsWith("30")) {
      return Number(hours) + ":" + "00";
    }
    return (Number(hours) - 1).toFixed(1).toString() + ":" + "30";
  },
};
