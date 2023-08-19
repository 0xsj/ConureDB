import moment from "moment";

export const fakeData = {
  [moment(new Date()).format("YYYY-MM-DD")]: {
    data: [
      { id: "11", name: "커리", desc: "휴가 개인 사정" },
      { id: "111", name: "르브론", desc: "휴가 개인 사정" },
    ],
  },
  "2022-07-13": {
    data: [{ id: "22", name: "마이클", desc: "휴가 개인 사정" }],
  },
  "2022-07-15": {
    data: [{ id: "33", name: "루이스", desc: "휴가 개인 사정" }],
  },
  "2022-07-27": {
    data: [
      { id: "1", name: "김철수", desc: "휴가 개인 사정" },
      { id: "2", name: "홍길동", desc: "휴가 개인 사정" },
      { id: "3", name: "김길동", desc: "휴가 개인 사정" },
      { id: "4", name: "손길동", desc: "휴가 개인 사정" },
      { id: "5", name: "이길동", desc: "휴가 개인 사정" },
      { id: "6", name: "손철수", desc: "휴가 개인 사정" },
      { id: "7", name: "박철수", desc: "휴가 개인 사정" },
      { id: "8", name: "진철수", desc: "휴가 개인 사정" },
      { id: "9", name: "진길동", desc: "휴가 개인 사정" },
      { id: "10", name: "마길동", desc: "휴가 개인 사정" },
    ],
  },
  "2022-07-28": {
    data: [{ id: "111", name: "김가구", desc: "휴가 개인 사정" }],
  },
  "2022-08-28": {
    data: [{ id: "81", name: "박가구", desc: "휴가 개인 사정" }],
  },
};

export const generateContributionData = () => {
  const startDate = moment().startOf("year"); // Start of the current year
  const endDate = moment().endOf("year"); // End of the current year
  const daysInYear = endDate.diff(startDate, "days") + 1;

  const dummyData = [];

  for (let i = 0; i < daysInYear; i++) {
    const currentDate = startDate.clone().add(i, "days");
    const value = Math.floor(Math.random() * 10); // Random value between 0 and 9

    dummyData.push({
      date: currentDate.format("YYYY-MM-DD"),
      value: value,
    });
  }

  return dummyData;
};
