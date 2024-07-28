import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Benefits of Fasting</ThemedText>
      </ThemedView>
      <ThemedText>
        Fasting is a practice that can offer numerous health benefits when done
        correctly. Here, we'll explore some of these benefits.
      </ThemedText>
      <Collapsible title="Improved Metabolic Health">
        <ThemedText>
          Fasting can improve various aspects of metabolic health. It helps in
          reducing insulin resistance, which lowers the risk of type 2 diabetes.
          Fasting periods allow the body to use up excess glucose, leading to
          improved blood sugar control.
        </ThemedText>
        <ThemedText>
          Additionally, fasting may help in lowering blood pressure and
          cholesterol levels, contributing to overall cardiovascular health.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Enhanced Brain Function">
        <ThemedText>
          Studies suggest that fasting may enhance brain function by promoting
          the production of brain-derived neurotrophic factor (BDNF), which
          supports cognitive function and mental clarity.
        </ThemedText>
        <ThemedText>
          Fasting can also encourage autophagy, a process where the brain clears
          out damaged cells, which is believed to protect against
          neurodegenerative diseases.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Weight Management">
        <ThemedText>
          One of the most popular reasons for fasting is weight management. By
          reducing the eating window, many people naturally consume fewer
          calories, which can lead to weight loss.
        </ThemedText>
        <ThemedText>
          Fasting can also increase metabolic rate temporarily, enhancing fat
          burning and contributing to weight loss goals.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Improved Longevity">
        <ThemedText>
          Fasting may contribute to increased longevity by enhancing cellular
          repair processes and reducing inflammation. The practice of
          intermittent fasting has been associated with longer lifespan in
          several animal studies.
        </ThemedText>
        <ThemedText>
          While human studies are still ongoing, the potential for fasting to
          extend lifespan remains a compelling area of research.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Detoxification and Cellular Repair">
        <ThemedText>
          Fasting activates the body's detoxification processes. During fasting
          periods, the body works more efficiently to remove toxins and repair
          damaged cells.
        </ThemedText>
        <ThemedText>
          Autophagy, the body's way of cleaning out damaged cells and
          regenerating new ones, is particularly enhanced during fasting,
          contributing to overall health.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Tips for Effective Fasting">
        <ThemedText>
          To maximize the benefits of fasting, it is important to stay hydrated
          and consume nutrient-dense foods during eating periods. Avoiding
          excessive caloric intake and choosing balanced meals can help sustain
          the benefits of fasting.
        </ThemedText>
        <ThemedText>
          Always consult with a healthcare provider before starting a fasting
          regimen, especially if you have underlying health conditions or are on
          medication.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
