using Combinatorics
perms = permutations(["av","an","mp","rr"]) |> collect

for (i,p) in enumerate(perms)
    println("else if(participant==",i-1,"){")
    println("stimulus_1=shuffle(",p[4],"_vector);")
    println("stimulus_2=shuffle(",p[2],"_vector);")
    println("stimulus_3=shuffle(",p[3],"_vector);")
    println("stimulus_4=shuffle(",p[1],"_vector);")
    println("probe=shuffle(",p[2],"_probes);")
    println("}")
    println()
end
