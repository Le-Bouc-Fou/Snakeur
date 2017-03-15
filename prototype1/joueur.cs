using UnityEngine;
using System.Collections;

public class joueur : MonoBehaviour {

	int direction = 0;
	public GameObject head;
	public float speed = 0.032f;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetKeyDown(KeyCode.UpArrow)){
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
}
