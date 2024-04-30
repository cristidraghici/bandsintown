const devLog = <T>(data: T) => {
  if (!import.meta.env.DEV) {
    return;
  }
  console.log(data);
};

export default devLog;
