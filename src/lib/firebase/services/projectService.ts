import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import type { Project } from "@/types/Project";
import { fallbackProjectsData } from "@/lib/data/projectData";

const COLLECTION_NAME = "projects";

export class ProjectService {
  static async getAllProjects(): Promise<Project[]> {
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      console.log("Using fallback projects data for testing");
      return fallbackProjectsData;
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("isVisible", "==", true),
        orderBy("id", "desc")
      );
      const querySnapshot = await getDocs(q);

      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data(),
        } as Project);
      });

      return projects;
    } catch (error) {
      console.error("Error fetching projects, falling back to static data:", error);
      return fallbackProjectsData;
    }
  }
}
