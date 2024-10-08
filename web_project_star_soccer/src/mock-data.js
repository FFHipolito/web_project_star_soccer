const generatePlayerList = () => {
  const playerList = [];
  for (let i = 1; i <= 20; i++) {
    const newPlayer = {
      id: `${i}`,
      name: `Player ${i}`,
      email: `player${i}@email.com`,
      phone: "(99) 99999-9999",
      isPlaying: true,
    };
    playerList.push(newPlayer);
  }
  return playerList;
};

export const userMock = {
  id: "99",
  name: "Test User Admin",
  email: "useradmin@email.com",
  phone: "(99) 99999-9999",
  isAdmin: true,
  isPlaying: false,
};

export const matchMock = {
  // id: "1",
  // date: "20/09/2024",
  // time: "11:00h",
  // players: generatePlayerList(),
};
