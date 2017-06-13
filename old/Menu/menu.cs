using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class menu : MonoBehaviour {

	public void loadscene (int index) {
		SceneManager.LoadScene(index);
	}

	public void quitter () {
		Application.Quit ();
	}
}
