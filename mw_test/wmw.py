
from scipy.stats import mannwhitneyu
from scipy.stats import kruskal

rr=[]
mp=[]
an=[]

with open('rr_count.dat','r') as f:
   for line in f:
       rr.append(float(line.strip()))

with open('mp_count.dat','r') as f:
   for line in f:
       mp.append(float(line.strip()))

with open('an_count.dat','r') as f:
   for line in f:
       an.append(float(line.strip()))


def mwu(case,data1,data2):
    stat, p = mannwhitneyu(data1, data2,alternative="greater")
    print(case,stat,p)

stat,p = kruskal(mp,rr,an)    

print("kw",stat,p)

mwu("mp,rr",mp,rr)
mwu("an,rr",an,rr)
mwu("an,mp",an,mp)
       
