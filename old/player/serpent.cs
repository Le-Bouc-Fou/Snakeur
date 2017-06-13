using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class serpent : MonoBehaviour {

	int direction = 0;
	public GameObject head;
	public float speed = 0.020f;
	public GameObject text_vie;
	public GameObject text_pomme;
	public int vie = 3;
	public int pommes = 0;

	// Ce script est appeler 1 fois au début
	void Start () {
		head.GetComponent<Transform>().position = new Vector3(-1.92f, -0.8f, 1);
		direction = 0;
		text_pomme.GetComponent<Text> ().text = pommes + " pommes";
		text_vie.GetComponent<Text> ().text = vie + " vies";
	}

	// Le code est appeler en boucle
	void Update () {
		if(Input.GetKeyDown(KeyCode.UpArrow)){        // on regarde si une touche directionnelle est présser, est on change la valeur de "direction" si besoins
			direction = 0;
		}
		else if(Input.GetKeyDown(KeyCode.RightArrow)){
			direction = 270;
		}
		else if(Input.GetKeyDown(KeyCode.DownArrow)){
			direction = 180;
		}
		else if(Input.GetKeyDown(KeyCode.LeftArrow)){
			direction = 90;
		}
	}

	// le code est executer à chaque FPS (de manière régulière)
	void FixedUpdate () {

		// A chaque FPS, on fait bouger le serpent dans la direction contenu dans "direction". simple, non ?

		switch (direction) {
		case 0:
			head.GetComponent<Transform>().Translate(0.0f,speed,0.0f,head.GetComponent<Transform>());
			break;
		case 90:
			head.GetComponent<Transform>().Translate(-speed,0.0f,0.0f,head.GetComponent<Transform>());
			break;
		case 180:
			head.GetComponent<Transform>().Translate(0.0f,-speed,0.0f,head.GetComponent<Transform>());
			break;
		case 270:
			head.GetComponent<Transform>().Translate(speed,0.0f,0.0f,head.GetComponent<Transform>());
			break;
		}
	}

	// lors d'une collision, c'est ce script qui est appelé
	void OnCollisionEnter2D (Collision2D col) {
		if (col.gameObject.name == "BotteDePaille") {
			head.GetComponent<Transform> ().position = new Vector3 (-1.92f, -0.8f, 1);
			direction = 0;
			vie--;
			text_vie.GetComponent<Text> ().text = vie + " vies";
			if (vie == 0) {
				SceneManager.LoadScene (0);
			}
		} else {
			Debug.Log("collision avec un object inconnu, name : " + col.gameObject.name);
		}
	}

	void OnTriggerEnter2D (Collider2D col) {
		if (col.gameObject.name == "Pomme") {
			Destroy(col.gameObject);
			pommes++;
			text_pomme.GetComponent<Text> ().text = pommes + " pommes";
		}
	}
}
