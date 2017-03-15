using UnityEngine;
using System.Collections;

public class map : MonoBehaviour {
	public GameObject fond;
	public GameObject mur;
	public GameObject[] materiaux;
	int[] map01 = { 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,
					1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,
					1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,
					1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
					1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,
					1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1};

	public void Start () {
		Generate(materiaux, map01, 16);
	}

	public void Generate (GameObject[] materiaux, int[] mapfile, int sizex) {
		float x = 0.0f;
		float y = 0.0f;
		float maxX = sizex * 0.32f;
		foreach (int item in mapfile)
		{
			if(x > maxX - 0.32f){
				x = 0.0f;
				y = y + 0.32f;
			}
			Instantiate(materiaux[item], new Vector3(x + 0.16f, y + 0.16f, 0), new Quaternion(0,0,0,0));
			x = x + 0.32f;
		}
	}
}
