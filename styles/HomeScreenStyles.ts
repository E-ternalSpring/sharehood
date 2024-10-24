import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B8562',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#FFFFFF',
    fontFamily: 'JuliusSansOne',
    textAlign: 'left',
    marginTop: 50,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 20,
  },
  avatar: {
    position: 'absolute',
    top: 60,
    right: 30,
    backgroundColor: '#2D6B46'
  },  
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    fontSize: 20,
    color: '#DADCE0',
    marginHorizontal: 10,
  },
  activeTab: {
    color: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardAvatar: { 
    color: '#FFFFFF',
    position: 'absolute',
    top: -7,
    left: -7,
    backgroundColor: '#2D6B46',
  },
  cardTitle: {
    top: 2,
    marginLeft: 0,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardName: {
    top: -6,
    marginLeft: 50,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D6B46',
  },
  cardSubtitle: {
    top: -5,
    marginLeft: 50,
    fontSize: 12,
    color: '#2D6B46',
  },
  cardDescription: {
    top: 2,
    marginLeft: 0,
    fontSize: 14,
    color: '#606060',
  },
  image: {
    position: 'absolute',
    right: -5,
    top: '50%',
    transform: [{ translateY: -50 }],
    height: 100,
    width: 100,
    borderRadius: 14,
    resizeMode: 'contain',
  },  
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
    backgroundColor: '#FFFFFF',
  },
  icons: {
    fontSize: 28,
    color: '#2D6B46',
  }
});
