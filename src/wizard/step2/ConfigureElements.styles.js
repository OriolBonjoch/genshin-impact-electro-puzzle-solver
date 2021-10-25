const card = {
  m: 2,
  height: '100%',
  width: 'calc(100% - 2rem)',
};

const disabledCard = {
  ...card,
  paddingRight: '100%',
  backgroundColor: '#FFFFFF',
  backgroundImage: `
    linear-gradient(70deg, transparent 72%, #6666FF 72%),
    linear-gradient(110deg, transparent 72%, #6666FF 72%)`,
  transition: 'padding 0.2s ease',
};

const image = {
  width: '40%',
  margin: '0 25%',
};

const styles = {
  card,
  disabledCard,
  image,
};

export default styles;
