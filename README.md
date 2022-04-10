```
npm i
```

```
cat <<EOT > addresses-eip55.txt
0x5417BA9aC1aD9a685D213191F3E63531FedE333b
0x5417BA9aC1aD9a685D213191F3E63531FedE333b
0x5417BA9aC1aD9a685D213191F3E63531FedE333b
EOT

cat addresses-eip55.txt | node eip55tobech32.js | tee addresses-bech32.jsonl
```

Result:

```
{"from":"0x5417BA9aC1aD9a685D213191F3E63531FedE333b","to":"cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek"}
{"from":"0x5417BA9aC1aD9a685D213191F3E63531FedE333b","to":"cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek"}
{"from":"0x5417BA9aC1aD9a685D213191F3E63531FedE333b","to":"cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek"}
```


```
cat <<EOT > addresses-bech32.txt
cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek
cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek
cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek
EOT

cat addresses-bech32.txt | OP=decode node eip55tobech32.js | tee addresses-eip55.jsonl
```

Result:

```
{"from":"cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek","to":"0x5417BA9aC1aD9a685D213191F3E63531FedE333b"}
{"from":"cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek","to":"0x5417BA9aC1aD9a685D213191F3E63531FedE333b"}
{"from":"cosmos12stm4xkp4kdxshfpxxgl8e34x8lduvem4m28ek","to":"0x5417BA9aC1aD9a685D213191F3E63531FedE333b"}
```
