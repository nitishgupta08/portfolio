import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import type { Experience } from "@/types/Experience";
import { fallbackExperienceData } from "@/lib/data/experienceData";

const COLLECTION_NAME = "experiences";

export class ExperienceService {
  static async getAllExperiences(): Promise<Experience[]> {
    // If using fallback data for development/testing
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      console.log("Using fallback experience data for testing");
      return fallbackExperienceData;
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("isVisible", "==", true),
        orderBy("id", "desc")
      );

      const querySnapshot = await getDocs(q);

      const experiences: Experience[] = [];

      querySnapshot.forEach((doc) => {
        experiences.push({
          id: doc.id,
          ...doc.data(),
        } as Experience);
      });

      return experiences;
    } catch (error) {
      console.error("Error fetching experiences, falling back to static data:", error);
      return fallbackExperienceData;
    }
  }
}
