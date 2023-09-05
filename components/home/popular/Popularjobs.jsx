import { useState } from 'react';
import { useRouter } from 'expo-router';

import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';

// C'est le hook 'maison' que nous avons créé
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();

  // Dans un premier temps
  // =====================

  // Pour la démo, je crée des constantes qui sont "false" par défaut
  // const isLoading = false;
  // const error = false;

  // Dans un second temps
  // =====================

  // Je viens récupérer les bonnes informations grace à mon hook maison useFetch
  // Le hook prend deux paramètres : le endpoint (search) / et la query
  const { data, isLoading, error } = useFetch
    ('search', {
      query: 'React developer',
      num_pages: 1
    })
  
    const [selectedJob, setSelectedJob] = useState();

    // Pour diriger vers le bon job quand on clique sur sa carte
    const handleCardPress = (item) => {
      router.push(`/job-details/${item.job_id}`);
      setSelectedJob(item.job_id);
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {/* Écriture ternaire selon si ça charge ou pas */}
        {isLoading ? ( // Si ça charge
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ): error ? ( // Si ça ne charge pas et qu'il y a une erreur
          <Text>Something went wrong</Text>
        ): (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs;