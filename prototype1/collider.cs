using UnityEngine;
using System.Collections;

public class collider : MonoBehaviour {

	public GameObject me;

	void OnTriggerEnter(Collider obj){
		Debug.Log(obj.gameObject.name);
		if(obj.gameObject.name == "mur"){
			me.GetComponent<Transform>().Translate(0.48f,0.48f,0.0f);
		}
	}
}
