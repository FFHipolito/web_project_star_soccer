export const userMock = {
  name: "Fernando",
  email: "email@email.com",
  phone: "(99)99999-9999",
  isAdmin: true,
};

export const matchMock = {
  date: "20/09/2024",
  time: "11:00h",
};

export const playerlistMock = () => {
  const playerList = [];
  for (let i = 1; i <= 20; i++) {
    const newPlayer = {
      name: `Player ${i}`,
      email: `player${i}@email.com`,
      phone: "(99) 99999-9999",
    };
    playerList.push(newPlayer);
  }
  return playerList;
};
