using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class mapmanager : MonoBehaviour {

	public void load_map (string name) {
		switch (name) {
		case "tutoriel1":
			break;
		}
	}

	void loadscene (int index) {
		SceneManager.LoadScene(index);
	}
}
