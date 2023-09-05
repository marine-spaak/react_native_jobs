import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import {
  Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics
} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import About from '../../components/jobdetails/about/About';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]); // Premier onglet actif

  // TODO
  const onRefresh = () => {};

  // Fonction qui gère l'affichage de tel ou tel onglet About / Qualif / Resp
  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return <About
          info={data[0].job_description ?? "No data provided"}
          />
      case "Qualifications":
        return <Specifics
          title="Qualitifactions"
          points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
      case "Responsibilities":
        break;
    }
  };

  const { data, isLoading, error, refetch } = useFetch('job-details', {job_id: params.id});

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => ( // Le bouton de gauche avec "précédent" et router.back
            <ScreenHeaderBtn
              iconURL={icons.left}
              dimension="60%"
              onPress={() => router.back()}
            />
          ),
          headerRight: () => ( //TODO Le bouton de droite avec "partager"
          <ScreenHeaderBtn
            iconURL={icons.share}
            dimension="60%"
          />
        ),
        headerTitle: '', // On ne veut pas que le titre s'affiche en haut
        }}
      />

      {/* React Fragment - aller relire la doc */}
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} 
              onRefresh={onRefresh}
            />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary}/>
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom:100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}

            </View>
          )
        }
        </ScrollView>
      </>

    </SafeAreaView>
  )
}

export default JobDetails;