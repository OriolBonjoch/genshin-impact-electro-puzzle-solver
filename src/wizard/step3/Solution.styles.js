const cardHidden = {
  m: 2,
  height: '100%',
  boxShadow: 0,
  backgroundColor: 'transparent',
};

const cardShown = {
  m: 2,
  height: '100%',
  backgroundColor: '#FFFFFF',
  backgroundImage: `
    linear-gradient(60deg, transparent 50%, #6666FF 50%),
    linear-gradient(120deg, transparent 50%, #6666FF 50%)`,
  transition: 'padding 0.2s ease',
};

const cardContentBase = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: '100%',
};

const alignVertically = {
  p: 0,
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = {
  cardHidden,
  cardShown,
  cardContentBase,
  alignVertically,
};

export default styles;
