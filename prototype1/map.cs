using UnityEngine;
using System.Collections;

public class map : MonoBehaviour {
	public GameObject fond;
	public GameObject mur;
	int[] map01 = { 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,
					1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,
					1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,
					1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
					1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1};

	public void Start () {
		Generate(map01);
	}

	public void Generate (int[] mapfile) {
		float x = 0.0f;
		float y = 0.0f;
		foreach (int item in mapfile)
		{
			if(x > 5.11f){
				x = 0.0f;
				y = y + 0.32f;
			}
			if(item == 0){
				Instantiate(fond, new Vector3(x, y, 0), new Quaternion(0,0,0,0));
			}
			else if(item == 1){
				Instantiate(mur, new Vector3(x, y, 0), new Quaternion(0,0,0,0));
			}
			x = x + 0.32f;
		}
	}
}
